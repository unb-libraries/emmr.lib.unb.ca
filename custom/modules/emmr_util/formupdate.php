<?php

/**
 * @file
 * Contains formupdate.php.
 * This script updates all legacy recipes to the new UNB Lib transcription text format.
 */

use Drupal\node\Entity\Node;

echo "\n";
// Get an array of all 'recipe' node ids.
$recipe_nids = \Drupal::entityQuery('node')
  ->condition('type', 'emmr_recipe')
  ->accessCheck(FALSE)->execute();

// Load all the recipes.
$recipes = Node::loadMultiple($recipe_nids);
// Iterate.
foreach ($recipes as $recipe) {
  // Get transcription value.
  $trans = $recipe->field_recipe_transcription->getValue()[0]['value'];

  // Set transcription to new text format.
  $recipe->field_recipe_transcription->setValue([
    'value' => $trans,
    'format' => 'unb_libraries_transcribe',
  ]);

  // Update recipe and report.
  $recipe->save();
  $id = $recipe->id();
  $title = $recipe->title->getValue()[0]['value'];
  echo "\nUpdated emmr_recipe [$id][$title]";
}

echo "\n";