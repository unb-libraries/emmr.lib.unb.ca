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
      var textSpan = editor.document.createElement('span');
      var numberSpan = editor.document.createElement('span');

      textSpan.setAttribute('class', 'trxn-text');
      textSpan.setText(marginText);

      numberSpan.setAttribute('class', 'trxn-margin');
      numberSpan.setText('X');
      numberSpan.$.appendChild(textSpan.$);

      editor.insertElement(numberSpan);

      // Re-number marginalia
      var margins = editor.document.find('.trxn-margin');

      for (var i = 0; i < margins.$.length; i++) {
        margins.$[i].firstChild.data = (i + 1).toString();
      }
    }
  };
});
