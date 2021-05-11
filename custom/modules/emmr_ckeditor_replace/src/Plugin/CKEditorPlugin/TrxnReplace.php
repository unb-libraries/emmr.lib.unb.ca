<?php

namespace Drupal\emmr_ckeditor_replace\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor\CKEditorPluginCssInterface;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "Transcription Replace" plugin.
 *
 * @CKEditorPlugin(
 *   id = "trxn_replace",
 *   label = @Translation("Transcription Replace"),
 *   module = "emmr_ckeditor_replace"
 * )
 */
class TrxnReplace extends CKEditorPluginBase implements CKEditorPluginCssInterface {

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
    return drupal_get_path('module', 'emmr_ckeditor_replace') . '/js/plugins/trxn_replace/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return [
      'trxn_replace' => [
        'label' => t('Transcription Replace'),
        'image' => drupal_get_path('module', 'emmr_ckeditor_replace') .
        '/js/plugins/trxn_replace/icons/trxn_replace.png',
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
