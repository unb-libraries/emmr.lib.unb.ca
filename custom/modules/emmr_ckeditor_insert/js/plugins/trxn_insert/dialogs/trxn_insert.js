CKEDITOR.dialog.add('trxn_insertDialog', function(editor) {
  return {
    title: 'Transcription Insert',
    minWidth: 400,
    minHeight: 200,

    contents: [
      {
        id: 'tab-insert',
        label: '',
        elements: [
          {
          type: 'text',
          id: 'to-insert',
          label: 'Text to insert'          }
        ]
      }
    ],

    onOk: function() {
      var dialog = this;
      var insertText = dialog.getValueOf('tab-insert', 'to-insert');
      var textSpan = editor.document.createElement('span');
      var caretSpan = editor.document.createElement('span');
      var trxnTag = editor.document.createElement('trxn');

      textSpan.setAttribute('class', 'trxn-text');
      textSpan.setText(insertText);

      caretSpan.setAttribute('class', 'trxn-caret');
      caretSpan.setText('^');
      caretSpan.$.appendChild(textSpan.$);
      trxnTag.$.appendChild(caretSpan.$);

      editor.insertHtml(editor.getSelectedHtml(true));
      editor.insertElement(trxnTag);
    }
  };
});
