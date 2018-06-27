CKEDITOR.plugins.add('trxn_undo', {
  icons: 'trxn_undo',

  init: function(editor) {
    editor.addCommand('trxn_undo', {
      exec: function(editor) {
        var selection =
          editor.getSelectedHtml(true);

        var err = "No transcription content found in selection. " +
          "Please make sure all elements (red text) are selected, or use the " +
          "default [Undo] button to reverse formatting step-by-step.";

        if (selection.indexOf("trxn-replace") > 0) {
          editor.execCommand('undo');
          editor.execCommand('undo');
        }
        else if (selection.indexOf("trxn-caret") > 0) {
          editor.execCommand('undo');
        }
        else alert(err);
      }
    });

    var pluginDirectory = this.path;

    editor.ui.addButton('trxn_undo', {
      label: 'Transcription Undo',
      command: 'trxn_undo',
      toolbar: 'formatting'
    });
  }
});
