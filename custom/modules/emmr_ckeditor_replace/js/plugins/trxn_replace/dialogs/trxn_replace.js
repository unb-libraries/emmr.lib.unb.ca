CKEDITOR.dialog.add('trxn_replaceDialog', function(editor) {
  return {
    title: 'Transcription Replace',
    minWidth: 400,
    minHeight: 200,

    contents: [
      {
        id: 'tab-replace',
        label: '',
        elements: [
          {
          type: 'text',
          id: 'to-replace',
          label: 'Text to replace'          }
        ]
      }
    ],

    onOk: function() {
      var dialog = this;
      var replaceText = dialog.getValueOf('tab-replace', 'to-replace');
      var textSpan = editor.document.createElement('span');
      var cursorSpan = editor.document.createElement('span');
      var selectedStrike = editor.document.createElement('s');
      var selectedText = editor.getSelection().getSelectedText();
      var trxnTag = editor.document.createElement('trxn');

      textSpan.setAttribute('class', 'trxn-retext');
      textSpan.setText(replaceText);

      cursorSpan.$.setAttribute('class', 'trxn-replace');
      cursorSpan.$.appendChild(textSpan.$);
      trxnTag.$.appendChild(cursorSpan.$);

      selectedStrike.setText(selectedText);

      // editor.insertElement(cursorSpan);
      // editor.insertElement(selectedStrike);

      trxnTag.$.appendChild(selectedStrike.$);
      editor.insertElement(trxnTag);
    }
  };
});
