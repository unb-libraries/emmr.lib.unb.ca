<?php

namespace Drupal\emmr_ckeditor_undo\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor\CKEditorPluginCssInterface;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "Transcription Undo" plugin.
 *
 * @CKEditorPlugin(
 *   id = "trxn_undo",
 *   label = @Translation("Transcription Undo"),
 *   module = "emmr_ckeditor_undo"
 * )
 */
class TrxnUndo extends CKEditorPluginBase implements CKEditorPluginCssInterface {

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
    return \Drupal::service('extension.list.module')->getPath('emmr_ckeditor_undo') . '/js/plugins/trxn_undo/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return [
      'trxn_undo' => [
        'label' => $this->t('Transcription Undo'),
        'image' => \Drupal::service('extension.list.module')->getPath('emmr_ckeditor_undo') .
        '/js/plugins/trxn_undo/icons/trxn_undo.png',
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
