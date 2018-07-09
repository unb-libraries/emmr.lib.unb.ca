// On document ready.
jQuery(document).ready(function() {
  if (jQuery("#recipe-details-header").length != 0) {
    // Recipe node view functionality
    // Copy annotations from CKEditor to annotations panel
    origin = ".field--name-field-recipe-transcription .trxn-margin";
    destin = "#recipe-anno";

    // If marginalia found
    if ( jQuery(origin).length != 0 ) {
      // If annotations panel not found
      if ( jQuery(destin).length === 0 ) {
        var anno = "<div class='col-md-2' id='recipe-anno'></div>";
        var parent = "#pages-trans-anno";
        jQuery(anno).appendTo(parent);
      }

      // Append marginalia tittle and items
      jQuery("<p><b>Marginalia</b></p>").appendTo(destin);
      jQuery(origin).clone().appendTo(destin);
    }
  }
});
