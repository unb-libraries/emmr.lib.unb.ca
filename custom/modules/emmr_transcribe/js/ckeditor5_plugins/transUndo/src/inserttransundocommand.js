/**
 * @file defines InsertTransUndoCommand, which is executed when the Transcription Replace
 * toolbar button is pressed.
 */
// cSpell:ignore transundoediting

import { Command } from 'ckeditor5/src/core';

export default class InsertTransUndoCommand extends Command {
  execute() {
    const { model } = this.editor;
    const { selection } = model.document;
    // Get and pass selected text.
    // const selected = selection.getFirstRange().getItems().next().value.data;
    const selected = selection.getSelectedElement();

    model.change((writer) => {
      // Insert <trxnun>*</trxnun> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createTransUndo(writer, selected));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // transUndo is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'transUndo',
    );

    // If the cursor is not in a location where a transUndo can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function createTransUndo(writer, selected) {
  alert(JSON.stringify(selected, undefined, 2));
  return;
  let replaceText = prompt("Enter transcription replacement text");
  // Return element only if a value is entered in dialog box. 
  if (replaceText) {
    // Create an instance of the unique element registered with the editor in
    // transundoediting.js.
    const transUndo = writer.createElement('transUndo');

    // Append the title and description elements to the transUndo, which matches
    // the parent/child relationship as defined in their schemas.
    writer.append(transUndoText, transUndo);
    writer.append(transUndoOld, transUndo);

    // Return the element to be added to the editor.
    return transUndo;
  }
  else {
    return;
  }
}
