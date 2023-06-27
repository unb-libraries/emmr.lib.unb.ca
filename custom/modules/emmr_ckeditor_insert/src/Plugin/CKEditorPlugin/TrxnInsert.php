<?php

namespace Drupal\emmr_ckeditor_insert\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor\CKEditorPluginCssInterface;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "Transcription Insert" plugin.
 *
 * @CKEditorPlugin(
 *   id = "trxn_insert",
 *   label = @Translation("Transcription Insert"),
 *   module = "emmr_ckeditor_insert"
 * )
 */
class TrxnInsert extends CKEditorPluginBase implements CKEditorPluginCssInterface {

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
    return drupal_get_path('module', 'emmr_ckeditor_insert') . '/js/plugins/trxn_insert/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return [
      'trxn_insert' => [
        'label' => $this->t('Transcription Insert'),
        'image' => drupal_get_path('module', 'emmr_ckeditor_insert') .
        '/js/plugins/trxn_insert/icons/trxn_insert.png',
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
