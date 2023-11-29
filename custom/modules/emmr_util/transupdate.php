<?php

/**
 * @file
 * Contains transupdate.php.
 * This script updates all legacy recipes to the new CKEditor 5 transcription format.
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
  // Find transcription item matches.
  preg_match_all('/<trxn>(.*?)<\/trxn>/', $trans, $matches);
  // Iterate.
  foreach ($matches[1] as $match) {
    // If transcription insert...
    if (str_contains($match, 'trxn-caret')) {
      // Get text.
      preg_match('/<span class="trxn-text">(.*?)<\/span>/', $match, $text);
      $text = $text[1];
      // Build new transcription item.
      $new = 
        "<trxnin><span class='trxn-caret'>^</span><span class='trxn-text'>$text</span></trxnin>";
      // Replace old item with new in transcription.
      $trans = str_replace("<trxn>$match</trxn>", $new, $trans, $count);
    }
    // If transcription replace...
    if (str_contains($match, 'trxn-retext')) {
      // Get text.
      preg_match('/<s>(.*?)<\/s>/', $match, $text);
      $text = $text[1];
      // Get replacement text.
      preg_match('/<span class="trxn-retext">(.*?)<\/span>/', $match, $retext);
      $retext = $retext[1];
      // Build new transcription item.
      $new = 
        "<trxnrep><span class='trxn-retext'>$retext</span><s class='trxn-replaced'>$text</s></trxnrep>";
      // Replace old item with new in transcription.
      $trans = str_replace("<trxn>$match</trxn>", $new, $trans, $count);
    }
    // If transcription marginalia...
    if (str_contains($match, 'trxn-number')) {
      // Get number.
      preg_match('/<span class="trxn-number">(.*?)<\/span>/', $match, $num);
      $num = $num[1];
      // Get text.
      preg_match('/<span class="trxn-text">(.*?)<\/span>/', $match, $text);
      $text = $text[1];
      // Build new transcription item.
      $new = 
        "<trxnmar><span class='trxn-number'>$num</span><span class='trxn-text'>$text</span></trxnmar>";
      // Replace old item with new in transcription.
      $trans = str_replace("<trxn>$match</trxn>", $new, $trans, $count);
    }
  }

  if ($trans != $recipe->field_recipe_transcription->getValue()[0]['value']) {
    $recipe->field_recipe_transcription->setValue([
      'value' => $trans,
      'format' => 'unb_libraries',
    ]);
    $recipe->save();
    $title = $recipe->title->getValue()[0]['value'];
    echo "\nUpdated emmr_recipe [$title]";
  }
}

echo "\n";
