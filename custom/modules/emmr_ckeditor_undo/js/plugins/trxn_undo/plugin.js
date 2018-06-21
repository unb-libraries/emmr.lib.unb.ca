CKEDITOR.plugins.add('trxn_undo', {
  icons: 'trxn_undo',

  init: function(editor) {
    editor.addCommand('trxn_undo',
      new CKEDITOR.dialogCommand('trxn_undoDialog'));

    var pluginDirectory = this.path;
    editor.addContentsCss( pluginDirectory + 'styles/trxn_undo.css' );

    editor.ui.addButton('trxn_undo', {
      label: 'Transcription undo',
      command: 'trxn_undo',
      toolbar: 'formatting'
    });

    CKEDITOR.dialog.add('trxn_undoDialog', this.path + 'dialogs/trxn_undo.js');
  }
});
