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
      var insertDiv = editor.document.createElement('div');

      insertDiv.setAttribute('id', 'trxn-insert');
      insertDiv.setAttribute('class', 'trxn-insert');
      insertDiv.setText(insertText);

      editor.insertElement(insertDiv);
    }
  };
});
