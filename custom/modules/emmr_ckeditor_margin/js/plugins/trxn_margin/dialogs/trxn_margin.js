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
      var margins = editor.document.find('.trxn-margin').count();
      newMargin = (margins + 1).toString();

      textSpan.setAttribute('class', 'trxn-text');
      textSpan.setText(marginText);

      numberSpan.setAttribute('class', 'trxn-margin');
      numberSpan.setText(newMargin);
      numberSpan.$.appendChild(textSpan.$);

      editor.insertElement(numberSpan);
    }
  };
});
