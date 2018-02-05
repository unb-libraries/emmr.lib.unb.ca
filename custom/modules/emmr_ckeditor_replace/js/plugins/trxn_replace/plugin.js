CKEDITOR.plugins.add('trxn_replace', {
  icons: 'trxn_replace',

  init: function(editor) {
    editor.addCommand('trxn_replace',
      new CKEDITOR.dialogCommand('trxn_replaceDialog'));

    var pluginDirectory = this.path;
    editor.addContentsCss( pluginDirectory + 'styles/trxn_replace.css' );

    editor.ui.addButton('trxn_replace', {
      label: 'Transcription Replace',
      command: 'trxn_replace',
      toolbar: 'formatting'
    });

    CKEDITOR.dialog.add('trxn_replaceDialog', this.path + 'dialogs/trxn_replace.js');
  }
});
