import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertTransUndoCommand from './inserttransundocommand';

// cSpell:ignore transundo inserttransundocommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with transUndo as this model:
 * <transUndo>
 * </transUndo>
 *
 * Which is converted for the browser/user as this markup
 * <trxnun>
 * </trxnun>
 *
 * This file has the logic for defining the transUndo model, and for how it is
 * converted to standard DOM markup.
 */
export default class TransUndoEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertTransUndo',
      new InsertTransUndoCommand(this.editor),
    );
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <transUndo>
   * </transUndo>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('transUndo', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where text is allowed.
      allowWhere: '$text',
    });
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    // Converters are registered via the central editor object.
    const { conversion } = this.editor;

    // Upcast Converters: determine how existing HTML is interpreted by the
    // editor. These trigger when an editor instance loads.
    //
    // If <span class="transUndo"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transUndo> model.
    conversion.for('upcast').elementToElement({
      model: 'transUndo',
      view: {
        name: 'trxnun',
      },
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <transUndo> are saved as
    // <trxnun>{{inner content}}</trxnun>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transUndo',
      view: {
        name: 'trxnun',
      },
    });

    // Editing Downcast Converters. These render the content to the user for
    // editing, i.e. this determines what gets seen in the editor. These trigger
    // after the Data Upcast Converters, and are re-triggered any time there
    // are changes to any of the models' properties.
    //
    // Convert the <transUndo> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'transUndo',
      view: (modelElement, { writer: viewWriter }) => {
        const trxnun = viewWriter.createContainerElement('trxnun', {});

        return toWidget(trxnun, viewWriter, { label: 'Transcription undo widget' });
      },
    });
  }
}
