/**
 * @file defines InsertTransMarginCommand, which is executed when the Transcription Marginalia
 * toolbar button is pressed.
 */
// cSpell:ignore transmarginediting

import { Command } from 'ckeditor5/src/core';

export default class InsertTransMarginCommand extends Command {
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <trxnmar>*</trxnmar> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createTransMargin(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // transMargin is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'transMargin',
    );

    // If the cursor is not in a location where a transMargin can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function createTransMargin(writer) {    
  // Create instances of the three elements registered with the editor in
  // transmarginediting.js.
  const transMargin = writer.createElement('transMargin');
  const transMarginNumber = writer.createElement('transMarginNumber');
  writer.appendText('#', {}, transMarginNumber);
  const transMarginText = writer.createElement('transMarginText');
  let marginaliaText = prompt("Enter transcription marginalia text");
  writer.appendText(marginaliaText, {}, transMarginText);

  // Append the title and description elements to the transMargin, which matches
  // the parent/child relationship as defined in their schemas.
  writer.append(transMarginNumber, transMargin);
  writer.append(transMarginText, transMargin);

  // Return the element to be added to the editor.
  return transMargin;
}
