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

      textSpan.setAttribute('class', 'trxn-text');
      textSpan.setText(replaceText);

      cursorSpan.$.appendChild(textSpan.$);

      editor.insertElement(cursorSpan);
    }
  };
});
