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
      var margin# = 0;

      textSpan.setAttribute('class', 'trxn-text');
      textSpan.setText(marginText);

      var margins = editor.document.getElementsByClassName('trxn-margin');
      alert(margins); 

      numberSpan.setAttribute('class', 'trxn-margin');
      numberSpan.setText('^');
      numberSpan.$.appendChild(textSpan.$);

      editor.insertElement(numberSpan);
    }
  };
});
