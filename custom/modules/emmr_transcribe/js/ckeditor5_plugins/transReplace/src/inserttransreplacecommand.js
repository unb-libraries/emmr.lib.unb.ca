/**
 * @file defines InsertTransReplaceCommand, which is executed when the Transcription Insert
 * toolbar button is pressed.
 */
// cSpell:ignore transreplaceediting

import { Command } from 'ckeditor5/src/core';

export default class InsertTransReplaceCommand extends Command {
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <trxn>*</trxn> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createTransReplace(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // transReplace is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'transReplace',
    );

    // If the cursor is not in a location where a transReplace can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function createTransReplace(writer) {
  // Create instances of the three elements registered with the editor in
  // transreplaceediting.js.
  const transReplace = writer.createElement('transReplace');
  const transReplaceCaret = writer.createElement('transReplaceCaret');
  writer.appendText('^', {}, transReplaceCaret);
  const transReplaceText = writer.createElement('transReplaceText');
  let insertText = prompt("Enter transcription insert text");
  writer.appendText(insertText, {}, transReplaceText);

  // Append the title and description elements to the transReplace, which matches
  // the parent/child relationship as defined in their schemas.
  writer.append(transReplaceCaret, transReplace);
  writer.append(transReplaceText, transReplace);

  // Return the element to be added to the editor.
  return transReplace;
}
