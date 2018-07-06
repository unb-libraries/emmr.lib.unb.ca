// On document ready.
jQuery(document).ready(function() {
  if (jQuery("#recipe-details-header").length != 0) {
    // Recipe node view functionality
    // Copy annotations from CKEditor to annotations panel
    origin = ".field--name-field-recipe-transcription .trxn-margin";
    destin = "#recipe-anno ";

    // If annotations found
    if ( jQuery(origin).length != 0 ) {
      jQuery("<p><b>Marginalia</b></p>").appendTo(destin);
      jQuery(origin).clone().appendTo(destin);
    }
  }
});
