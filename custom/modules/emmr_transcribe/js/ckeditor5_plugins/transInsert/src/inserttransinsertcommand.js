/**
 * @file defines InsertTransInsertCommand, which is executed when the Transcription Insert
 * toolbar button is pressed.
 */
// cSpell:ignore transinsertediting

import { Command } from 'ckeditor5/src/core';

export default class InsertTransInsertCommand extends Command {
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <trxnin>*</trxnin> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createTransInsert(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // transInsert is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'transInsert',
    );

    // If the cursor is not in a location where a transInsert can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function createTransInsert(writer) {    
  // Create instances of the three elements registered with the editor in
  // transinsertediting.js.
  const transInsert = writer.createElement('transInsert');
  const transInsertCaret = writer.createElement('transInsertCaret');
  writer.appendText('^', {}, transInsertCaret);
  const transInsertText = writer.createElement('transInsertText');
  let insertText = prompt("Enter transcription insert text");
  writer.appendText(insertText, {}, transInsertText);

  // Append the title and description elements to the transInsert, which matches
  // the parent/child relationship as defined in their schemas.
  writer.append(transInsertCaret, transInsert);
  writer.append(transInsertText, transInsert);

  // Return the element to be added to the editor.
  return transInsert;
}
