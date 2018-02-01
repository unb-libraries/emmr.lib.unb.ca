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
      var insertSpan = editor.document.createElement('span');
      var divID = 'trxn-div-' + Date.now().toString();
      var spanID = 'trxn-span-' + Date.now().toString();
      var insertAfterStyle = editor.document.createElement('style');

      insertDiv.setAttribute('id', spanID);
      insertDiv.setAttribute('class', 'trxn-div');
      insertDiv.setText(insertText);

      insertSpan.setAttribute('id', spanID);
      insertSpan.setAttribute('class', 'trxn-span');
      insertSpan.setText('^');
      insertSpan.$.appendChild(insertDiv.$);

      editor.insertElement(insertSpan);
    }
  };
});
