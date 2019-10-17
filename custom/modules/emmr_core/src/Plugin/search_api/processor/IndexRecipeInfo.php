<?php

namespace Drupal\emmr_core\Plugin\search_api\processor;

use Drupal\node\NodeInterface;
use Drupal\search_api\Datasource\DatasourceInterface;
use Drupal\search_api\IndexInterface;
use Drupal\search_api\Item\ItemInterface;
use Drupal\search_api\Processor\ProcessorPluginBase;
use Drupal\search_api\Processor\ProcessorProperty;

/**
 * Adds additional information to indexed recipes.
 *
 * @SearchApiProcessor(
 *   id = "index_additional_recipe_info",
 *   label = @Translation("Index Additional Information for a Recipe"),
 *   description = @Translation("Add additional recipe information to index."),
 *   stages = {
 *     "add_properties" = 0,
 *   },
 *   locked = true,
 *   hidden = true,
 * )
 */
class IndexRecipeInfo extends ProcessorPluginBase {

  /**
   * Only enabled for node indexes.
   *
   * {@inheritdoc}
   */
  public static function supportsIndex(IndexInterface $index) {
    foreach ($index->getDatasources() as $datasource) {
      if ($datasource->getEntityTypeId() == 'node') {
        return TRUE;
      }
    }
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions(DatasourceInterface $datasource = NULL) {

    $properties = [];

    if (!$datasource) {
      $definition = [
        'label' => $this->t('Publication Years'),
        'description' => $this->t('Years this recipe was published.'),
        'type' => 'integer',
        'is_list' => TRUE,
        'processor_id' => $this->getPluginId(),
      ];
      $properties['years_published'] = new ProcessorProperty($definition);
    }

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function addFieldValues(ItemInterface $item) {
    $node = $item->getOriginalObject()->getValue();

    if ($node instanceof NodeInterface) {
      if ($node->bundle() == 'emmr_recipe') {
        // Years published.
        $fields = $this->getFieldsHelper()
          ->filterForPropertyPath($item->getFields(), NULL, 'years_published');

        foreach ($fields as $field) {
          if (!empty($node->get('field_recipe_date_to')->date) && !empty($node->get('field_recipe_date')->date)) {
            $first_year = (int) $node->get('field_recipe_date')->date->format('Y');
            $last_year = (int) $node->get('field_recipe_date_to')->date->format('Y');

            for ($year = $first_year; $year <= $last_year; $year++) {
              $field->addValue($year);
            }
          }
        }
      }
    }
  }

}
