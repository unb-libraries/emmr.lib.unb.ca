CKEDITOR.dialog.add('trxn_undoDialog', function(editor) {
  return {
    title: 'Transcription undo',
    minWidth: 400,
    minHeight: 200,

    contents: [
      {
        id: 'tab-undo',
        label: '',
        elements: [
          {
          type: 'text',
          id: 'to-undo',
          label: 'Text to undo'          }
        ]
      }
    ],

    onOk: function() {
      var dialog = this;
      var undoText = dialog.getValueOf('tab-undo', 'to-undo');
      var textSpan = editor.document.createElement('span');
      var cursorSpan = editor.document.createElement('span');
      var selectedStrike = editor.document.createElement('s');
      var selectedText = editor.getSelection().getSelectedText();

      textSpan.setAttribute('class', 'trxn-retext');
      textSpan.setText(undoText);

      cursorSpan.$.setAttribute('class', 'trxn-undo');
      cursorSpan.$.appendChild(textSpan.$);

      selectedStrike.setText(selectedText);

      editor.insertElement(cursorSpan);
      editor.insertElement(selectedStrike);
    }
  };
});
