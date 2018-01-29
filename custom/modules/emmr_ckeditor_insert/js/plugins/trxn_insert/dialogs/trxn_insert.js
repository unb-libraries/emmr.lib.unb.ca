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
          // UI elements of the first tab    will be defined here.
        ]
      }
    ]
  };
});
