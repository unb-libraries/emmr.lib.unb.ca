/**
 * @file defines InsertSimpleBoxCommand, which is executed when the simpleBox
 * toolbar button is pressed.
 */
// cSpell:ignore annoinsertediting

import { Command } from 'ckeditor5/src/core';

export default class InsertAnnoInsertCommand extends Command {
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <simpleBox>*</simpleBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createAnnoInsert(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // simpleBox is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'annoInsert',
    );

    // If the cursor is not in a location where a simpleBox can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function createAnnoInsert(writer) {
  // Create instances of the three elements registered with the editor in
  // annoinsertediting.js.
  const annoInsert = writer.createElement('annoInsert');
  const annoInsertCaret = writer.createElement('annoInsertCaret');
  writer.appendText('^', {}, annoInsertCaret);
  const annoInsertText = writer.createElement('annoInsertText');
  writer.appendText('Type annotation text here', {}, annoInsertText);

  // Append the title and description elements to the simpleBox, which matches
  // the parent/child relationship as defined in their schemas.
  writer.append(annoInsertCaret, annoInsert);
  writer.append(annoInsertText, annoInsert);

  // Return the element to be added to the editor.
  return annoInsert;
}
