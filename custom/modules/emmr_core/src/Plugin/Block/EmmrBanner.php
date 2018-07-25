<?php

namespace Drupal\emmr_core\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a banner block for the intro screen.
 *
 * @Block(
 *   id = "emmr_banner",
 *   admin_label = @Translation("EMMR Banner"),
 *   category = @Translation("Misc"),
 * )
 */
class EmmrBanner extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $text =
      '<div id="emmr-header"><h1>Early Modern Maritime Recipes</h1></div>';
    return [
      '#markup' => $this->t($text),
    ];
  }

}
