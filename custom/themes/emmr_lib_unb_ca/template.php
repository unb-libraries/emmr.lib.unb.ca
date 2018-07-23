<?php

/**
 * @file
 * Contains template.php
 */

function emmr_lib_unb_ca_preprocess_html(&$variables) {
   drupal_add_css('//fonts.googleapis.com/css?family=Alegreya',
    array('group' => CSS_THEME));
}
