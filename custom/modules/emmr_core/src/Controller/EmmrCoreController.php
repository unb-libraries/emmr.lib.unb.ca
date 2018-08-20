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
    $pdf_name = "document";

    $response = new Response($dompdf->output());
    $response->headers->set('Content-Type', 'Content-type:application/pdf');
    $response->headers->set('Content-Disposition', "attachment; filename=\"{$pdf_name}.pdf\"");
    return $response;
  }

  /**
   * Check if node is a recipe.
   */
  public function checkPdfAccess($nid) {
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
