<?php

/**
 * @file
 * Contains refresh_recipes.php.
 */

use Drupal\node\Entity\Node;

// Get an array of all 'recipe' node ids.
$article_nids = \Drupal::entityQuery('node')
  ->condition('type', 'emmr_recipe')
  ->accessCheck(FALSE)->execute();

// Load all the articles.
$articles = Node::loadMultiple($article_nids);
foreach ($articles as $article) {
  $article->save();
}
