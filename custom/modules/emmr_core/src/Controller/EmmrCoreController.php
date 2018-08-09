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
    // Instantiate and use the dompdf class.
    $dompdf = new Dompdf();

    // Render node view html to string.
    $node = \Drupal::entityManager()->getStorage('node')->load(2);
    $view_builder = \Drupal::entityManager()->getViewBuilder('node');
    $renderarray = $view_builder->view($node, 'full');
    $html = \Drupal::service('renderer')->renderRoot($renderarray);

    // Load html into dompdf.
    $dompdf->loadHtml($html, "utf-8");

    // Render the HTML as PDF.
    $dompdf->render();

    // Output the generated PDF to Browser.
    kint($html);
    $dompdf->stream();
    exit;
  }

  /**
   * {@inheritdoc}
   */
  public function user() {
    return new RedirectResponse("/");
  }

}
