CKEDITOR.plugins.add('trxn_insert', {
  icons: 'trxn_insert',

  init: function(editor) {
    editor.addCommand('trxn_insert',
      new CKEDITOR.dialogCommand('trxn_insertDialog'));

    var pluginDirectory = this.path;
    editor.addContentsCss( pluginDirectory + 'styles/trxn_insert.css' );

    editor.ui.addButton('trxn_insert', {
      label: 'Transcription Insert',
      command: 'trxn_insert',
      toolbar: 'formatting'
    });

    CKEDITOR.dialog.add('trxn_insertDialog', this.path + 'dialogs/trxn_insert.js');
  }
});
