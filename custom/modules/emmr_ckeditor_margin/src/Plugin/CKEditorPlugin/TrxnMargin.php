<?php

namespace Drupal\emmr_ckeditor_margin\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor\CKEditorPluginCssInterface;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "Transcription Margin" plugin.
 *
 * @CKEditorPlugin(
 *   id = "trxn_margin",
 *   label = @Translation("Transcription Marginalia"),
 *   module = "emmr_ckeditor_margin"
 * )
 */
class TrxnMargin extends CKEditorPluginBase implements CKEditorPluginCssInterface {

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return [];
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::isInternal().
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'emmr_ckeditor_margin') . '/js/plugins/trxn_margin/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return [
      'trxn_margin' => [
        'label' => t('Transcription Marginalia'),
        'image' => drupal_get_path('module', 'emmr_ckeditor_margin') .
        '/js/plugins/trxn_margin/icons/trxn_margin.png',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getCssFiles(Editor $editor) {
    return [];
  }

}
