<?php

namespace Drupal\emmr_core\Controller;

use Drupal\Core\Controller\ControllerBase;
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
  public function pdf() {
    $element = [
      '#theme' => 'emmr_pdf',
      '#attributes' => [],
    ];

    // Instantiate and use the dompdf class.
    $dompdf = new Dompdf();

    // Render node view html to string.
    $node = \Drupal::entityManager()->getStorage('node')->load(2);
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

    // Output the generated PDF to Browser.
    $dompdf->stream();

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function user() {
    return new RedirectResponse("/");
  }

}
