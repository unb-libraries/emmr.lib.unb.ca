<?php

/**
 * @file
 * Contains libtext.php.
 *
 * Set all node text fields to use unb_libraries text format.
 */

// Search for all anniversary node ids.
$nids = Drupal::entityQuery('node')
  ->condition('type', 'emmr_recipe')->accessCheck(FALSE)->execute();

echo "\nStarting unb_libraries text format override...\n\n";
$i = 1;

// Load and update all anniversaries.
foreach ($nids as $nid) {
  $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
  $node->field_abstract->format = 'unb_libraries';
  $node->field_ingredients_index->format = 'unb_libraries';
  $node->field_symptoms_index->format = 'unb_libraries';
  $node->field_recipe_transcription->format = 'unb_libraries';
  $node->save();
  echo "$i recipe records updated.\r";
  $i++;
}

echo "\nDone.\n\n";
