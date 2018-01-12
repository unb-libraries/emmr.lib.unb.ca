<?php

namespace Drupal\emmr_core\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Routing\TrustedRedirectResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;

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
  public function user() {
    return new RedirectResponse("/");
  }

}
