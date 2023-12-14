<?php

/**
 * @file
 * Contains libtext.php.
 *
 * Set all node text fields to use unb_libraries text format.
 */

echo "\nStarting unb_libraries text format override...\n\n";

// Search for all article node ids.
$nids = Drupal::entityQuery('node')
  ->condition('type', 'article')->accessCheck(FALSE)->execute();

// Load and update all articles.
foreach ($nids as $nid) {
  $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
  $node->body->format = 'unb_libraries_basic';
  $node->save();
  $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
  $title = $node->title->value;

  if ($node->body->format != 'unb_libraries_basic') {
   echo "Could not update body for article [$title]\n"; 
  }
  else {
    echo "Updated body for article [$title]\n";
  }
}

// Search for all page node ids.
$nids = Drupal::entityQuery('node')
  ->condition('type', 'page')->accessCheck(FALSE)->execute();

// Load and update all pages.
foreach ($nids as $nid) {
  $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
  $node->body->format = 'unb_libraries_basic';
  $node->save();
  $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
  $title = $node->title->value;

  if ($node->body->format != 'unb_libraries_basic') {
   echo "Could not update body for page [$title]\n"; 
  }
  else {
    echo "Updated body for page [$title]\n";
  }
}

// Search for all recipe node ids.
$nids = Drupal::entityQuery('node')
  ->condition('type', 'emmr_recipe')->accessCheck(FALSE)->execute();

// Load and update all recipes.
foreach ($nids as $nid) {
  $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
  $node->field_abstract->format = 'unb_libraries_basic';
  $node->field_ingredients_index->format = 'unb_libraries_basic';
  $node->field_symptoms_index->format = 'unb_libraries_basic';
  $node->save();
  $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
  $title = $node->title->value;

  if ($node->field_abstract->format != 'unb_libraries_basic') {
   echo "Could not update field_abstract for recipe [$title]\n"; 
  }
  else {
    echo "Updated field_abstract for recipe [$title]\n";
  }

  if ($node->field_ingredients_index->format != 'unb_libraries_basic') {
   echo "Could not update field_ingredients_index for recipe [$title]\n"; 
  }
  else {
    echo "Updated field_ingredients_index for recipe [$title]\n";
  }

  if ($node->field_symptoms_index->format != 'unb_libraries_basic') {
   echo "Could not update field_symptoms_index for recipe [$title]\n"; 
  }
  else {
    echo "Updated field_symptoms_index for recipe [$title]\n";
  }
}

echo "\nDone.\n\n";
