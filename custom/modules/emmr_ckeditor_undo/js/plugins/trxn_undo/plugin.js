CKEDITOR.plugins.add('trxn_undo', {
  icons: 'trxn_undo',

  init: function(editor) {
    editor.addCommand('trxn_undo', {
      exec: function(editor) {
        var err = "Please select a complete transcription-formatted segment.";
        var er2 = "Please include strike-through text in selection to undo replacement.";
        var selHtml = editor.getSelectedHtml(true);
        var re = /<span class="trxn-text">([^<]+)<\/span>/;
        console.log(selHtml);

        var re_trxn = /<trxn>(.*)<\/trxn>/;
        var trxn = selHtml.match(re_trxn);

        if (trxn) {

          if (selHtml.indexOf("trxn-replace") > 0) {
            var re_strike = /<s>([^<]+)<\/s>/;
            var strike = selHtml.match(re_strike);

            if (strike) {
              console.log(strike[1]);
              editor.insertHtml(strike[1]);
            }
            else alert(er2);
          }
          else editor.insertHtml("");
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
