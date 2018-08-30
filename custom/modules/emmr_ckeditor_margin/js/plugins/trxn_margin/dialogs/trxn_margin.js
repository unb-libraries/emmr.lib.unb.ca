CKEDITOR.dialog.add('trxn_marginDialog', function(editor) {
  return {
    title: 'Transcription Marginalia',
    minWidth: 400,
    minHeight: 200,

    contents: [
      {
        id: 'tab-margin',
        label: '',
        elements: [
          {
          type: 'text',
          id: 'to-margin',
          label: 'Marginalia Text'          }
        ]
      }
    ],

    onOk: function() {
      var dialog = this;
      var marginText = dialog.getValueOf('tab-margin', 'to-margin');
      var marginSpan = editor.document.createElement('span');
      var textSpan = editor.document.createElement('span');
      var numberSpan = editor.document.createElement('span');
      var trxnTag = editor.document.createElement('trxn');

      textSpan.setAttribute('class', 'trxn-text');
      textSpan.setText(marginText);

      numberSpan.setAttribute('class', 'trxn-number');
      numberSpan.setText('X');

      marginSpan.setAttribute('class', 'trxn-margin');
      marginSpan.$.appendChild(numberSpan.$);
      marginSpan.$.appendChild(textSpan.$);
      trxnTag.$.appendChild(marginSpan.$);

      editor.insertHtml("&nbsp");
      editor.insertHtml(editor.getSelectedHtml(true));
      editor.insertElement(trxnTag);

      // Re-number marginalia
      var margins = editor.document.find('.trxn-number');

      for (var i = 0; i < margins.$.length; i++) {
        margins.$[i].firstChild.data = (i + 1).toString();
      }
    }
  };
});
