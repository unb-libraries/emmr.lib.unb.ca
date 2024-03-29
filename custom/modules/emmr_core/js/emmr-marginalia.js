(function($, navigator, once) {
  'use strict';

  Drupal.behaviors.emmrMarginalia = {
    attach: function (context, settings) {
      // On document ready.
      once('homepageActiveTabs', 'html').forEach(function (element) {
        if (jQuery("#recipe-details-header").length != 0) {
          // Recipe node view functionality
          // Copy annotations from CKEditor to annotations panel
          let origin = ".field--name-field-recipe-transcription trxnmar";
          let destin = "#recipe-anno";
      
          // If marginalia found
          var margins = jQuery(origin).clone();
          jQuery("<br><br>").appendTo(margins);

          if ( jQuery(origin).length != 0 ) {
            // If annotations panel not found
            if ( jQuery(destin).length === 0 ) {
              var anno = "<div class='col-md-2' id='recipe-anno'></div>";
              var parent = "#pages-trans-anno";
              jQuery(anno).appendTo(parent);
            }
      
            // Append marginalia tittle and items
            jQuery("<br><p><b>Marginalia</b></p>").appendTo(destin);
            jQuery("<div id='marginalia'></div>").appendTo(destin);
            destin += " > div#marginalia";
            jQuery(margins).clone().appendTo(destin);
          }
        }
      });
    }
  }
}(jQuery, navigator, once));