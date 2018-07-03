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
          label: 'Text to margin'          }
        ]
      }
    ],

    onOk: function() {
      var dialog = this;
      var marginText = dialog.getValueOf('tab-margin', 'to-margin');
      var textSpan = editor.document.createElement('span');
      var caretSpan = editor.document.createElement('span');

      textSpan.setAttribute('class', 'trxn-text');
      textSpan.setText(marginText);

      caretSpan.setAttribute('class', 'trxn-caret');
      caretSpan.setText('^');
      caretSpan.$.appendChild(textSpan.$);

      editor.marginElement(caretSpan);
    }
  };
});
