CKEDITOR.plugins.add('trxn_undo', {
  icons: 'trxn_undo',

  init: function(editor) {
    editor.addCommand('trxn_undo', {
      exec: function(editor) {
        alert("Hello World!");
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
