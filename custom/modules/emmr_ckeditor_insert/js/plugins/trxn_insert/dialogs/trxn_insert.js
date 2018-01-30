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
          label: 'Text to insert',
          validate: CKEDITOR.dialog.validate.notEmpty( "Text to insert cannot be empty." )
          }
        ]
      }
    ]
  };
});
