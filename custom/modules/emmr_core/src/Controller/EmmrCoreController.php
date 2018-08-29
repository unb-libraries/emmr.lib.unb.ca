<?php

namespace Drupal\emmr_core\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Drupal\Core\Access\AccessResult;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Dompdf\Dompdf;

/**
 * Controller for Datasets navigation.
 */
class EmmrCoreController extends ControllerBase {

  /**
   * {@inheritdoc}
   */
  public function home() {
    $element = [
      '#theme' => 'emmr_intro',
      '#attributes' => [],
    ];
    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function recipePdf($nid) {
    // Instantiate and use the dompdf class.
    $dompdf = new Dompdf();

    // Render node view html to string.
    $node = \Drupal::entityManager()->getStorage('node')->load($nid);
    $view_builder = \Drupal::entityManager()->getViewBuilder('node');
    $renderarray = $view_builder->view($node, 'pdf');
    $html = \Drupal::service('renderer')->renderRoot($renderarray);

    // Get module path.
    $path = DRUPAL_ROOT . '/' . drupal_get_path("module", "emmr_core");

    // Set base path for CSS.
    $path .= "/css";
    $dompdf->setBasePath($path);

    // Load html into dompdf.
    $dompdf->loadHtml($html, "utf-8");

    // Render the HTML as PDF.
    $dompdf->render();

    // Name PDF file.
    $pdf_name = $node->getTitle();

    $response = new Response($dompdf->output());
    $response->headers->set('Content-Type', 'Content-type:application/pdf');
    $response->headers->set('Content-Disposition', "attachment; filename=\"{$pdf_name}.pdf\"");
    return $response;
  }

  /**
   * {@inheritdoc}
   */
  public function imageZip($nid) {
    // Get node, temporary storage, empty file, file system.
    $node = \Drupal::entityManager()->getStorage('node')->load($nid);
    $zip_name = "emmr-" . strtolower($this->fNameClean($node->getTitle())) .
      "-id" . $nid . "-images";
    $zip_filename = tempnam(sys_get_temp_dir(), 'zip_temp');
    $zip_path = $zip_filename . ".zip";
    $zip_file_ok = file_put_contents($zip_path, '');
    $file_system = \Drupal::service('file_system');

    if ($zip_file_ok === FALSE) {
      drupal_set_message('Can\'t create zip file.', 'error');
      return;
    }

    // Get ZipArchive object.
    $zip = archiver_get_archiver($zip_path)->getArchive();

    // Get Drupal file objects from recipe images field.
    $images = $node->get("field_recipe_images")->getValue();
    $fids = [];

    foreach ($images as $image) {
      array_push($fids, $image["target_id"]);
    }

    $files = \Drupal::entityTypeManager()
      ->getStorage('file')
      ->loadMultiple($fids);

    $nfile = 0;

    // Add files to ZipArchive.
    foreach ($files as $file) {
      // The name of the file inside the ZIP archive. If specified,
      // it will override filename.
      $nfile++;
      $localname = $file->getFileName();
      $ext = substr($localname, -3);
      $localname = $zip_name . '-' . $nfile . '.' . $ext;
      // $filename - path to the file to add.
      $filename = $file_system->realpath($file->getFileUri());
      $zip->addFile($filename, $localname);
    }

    unset($files);
    unset($file);

    // Close ZipArchive.
    $zip->close();

    // Name ZIP, prepare and return download response.
    $out_response = file_get_contents($zip_path);
    $response = new Response($out_response);
    $response->headers->set('Content-Type', 'Content-type:application/zip');
    $response->headers->set('Content-Disposition', "attachment; filename=\"{$zip_name}.zip\"");
    return $response;
  }

  /**
   * {@inheritdoc}
   */
  public function fNameClean($string) {
    $string = str_replace(' ', '-', $string);
    $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string);
    return preg_replace('/-+/', '-', $string);
  }

  /**
   * Check if node is a recipe.
   */
  public function checkRecipe($nid) {
    $node = Node::load($nid);
    return AccessResult::allowedIf($node->bundle() === 'emmr_recipe');
  }

  /**
   * {@inheritdoc}
   */
  public function user() {
    return new RedirectResponse("/");
  }

}
