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
  if (selected === null) {
    return;
  }
  else {
    // Get transcription widget type.
    const type = selected.name;
    const transUndo = writer.createElement('span');
    
    if (type === "transReplace") {
      // Get data without quotations, and leave it after undo.
      const data = JSON.stringify(selected.getChild(2).getChild(0).data).replace(/["]+/g, '');
      writer.appendText(data, {}, transUndo);
      return transUndo;
    }
    else {
      // Insert empty = remove widget.
      return transUndo;
    }
  }
}
