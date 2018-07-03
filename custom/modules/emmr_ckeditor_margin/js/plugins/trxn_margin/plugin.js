CKEDITOR.plugins.add('trxn_margin', {
  icons: 'trxn_margin',

  init: function(editor) {
    editor.addCommand('trxn_margin',
      new CKEDITOR.dialogCommand('trxn_marginDialog'));

    var pluginDirectory = this.path;
    editor.addContentsCss( pluginDirectory + 'styles/trxn_margin.css' );

    editor.ui.addButton('trxn_margin', {
      label: 'Transcription Marginalia',
      command: 'trxn_margin',
      toolbar: 'formatting'
    });

    CKEDITOR.dialog.add('trxn_marginDialog', this.path + 'dialogs/trxn_margin.js');
  }
});
