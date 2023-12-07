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

// Load and update all anniversaries.
foreach ($nids as $nid) {
  $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
  $node->field_abstract->format = 'unb_libraries_basic';
  $node->save();
  $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
  $title = $node->title->value;

  if ($node->field_abstract->format != 'unb_libraries_basic') {
   echo "Could not update field_abstract for [$title]\n"; 
  }
  else {
    echo "Updated field_abstract for [$title]\n";
  }
}

echo "\nDone.\n\n";
