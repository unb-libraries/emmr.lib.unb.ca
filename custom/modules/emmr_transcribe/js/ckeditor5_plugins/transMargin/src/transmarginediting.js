import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertTransMarginCommand from './inserttransmargincommand';

// cSpell:ignore transmargin inserttransmargincommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with transMargin as this model:
 * <transMargin>
 *    <transMarginNumber></transMarginNumber>
 *    <transMarginText></transMarginText>
 * </transMargin>
 *
 * Which is converted for the browser/user as this markup
 * <trxnmar>
 *   <span class="trxn-number"></span>
 *   <span class="trxn-text"></span>
 * </trxnmar>
 *
 * This file has the logic for defining the transMargin model, and for how it is
 * converted to standard DOM markup.
 */
export default class TransMarginEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertTransMargin',
      new InsertTransMarginCommand(this.editor),
    );
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <transMargin>
   *    <transMarginNumber></transMarginNumber>
   *    <transMarginText></transMarginText>
   * </transMargin>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('transMargin', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
    });

    schema.register('transMarginNumber', {
      // This creates a boundary for external actions such as clicking and
      // and keypress. For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      isLimit: true,
      // This is only to be used within transMargin.
      allowIn: 'transMargin',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      allowContentOf: '$block',
    });

    schema.register('transMarginText', {
      isLimit: true,
      allowIn: 'transMargin',
      allowContentOf: '$block',
    });

    schema.addChildCheck((context, childDefinition) => {
      // Disallow transMargin inside self or any children.
      if (
        context.startsWith('trans') &&
        childDefinition.name === 'transMargin'
      ) {
        return false;
      }
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
    // If <trxnmar> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transMargin> model.
    conversion.for('upcast').elementToElement({
      model: 'transMargin',
      view: {
        name: 'trxnmar',
      },
    });

    // If <span class="trxn-number"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transMarginNumber> model, provided it is a child element of <transMargin>,
    // as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'transMarginNumber',
      view: {
        name: 'span',
        classes: 'trxn-number',
      },
    });

    // If <span class="trxn-text"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transMarginText> model, provided it is a child element of
    // <transMargin>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'transMarginText',
      view: {
        name: 'span',
        classes: 'trxn-text',
      },
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <transMargin> are saved as
    // <trxnmar>{{inner content}}</trxnmar>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transMargin',
      view: {
        name: 'trxnmar',
      },
    });

    // Instances of <transMarginNumber> are saved as
    // <span class="trxn-number">{{inner content}}</span>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transMarginNumber',
      view: {
        name: 'span',
        classes: 'trxn-number',
      },
    });

    // Instances of <transMarginText> are saved as
    // <span class="trxn-text">{{inner content}}</span>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transMarginText',
      view: {
        name: 'span',
        classes: 'trxn-text',
      },
   });

    // Editing Downcast Converters. These render the content to the user for
    // editing, i.e. this determines what gets seen in the editor. These trigger
    // after the Data Upcast Converters, and are re-triggered any time there
    // are changes to any of the models' properties.
    //
    // Convert the <transMargin> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'transMargin',
      view: (modelElement, { writer: viewWriter }) => {
        const trxnmar = viewWriter.createContainerElement('trxnmar', {});

        return toWidget(trxnmar, viewWriter, { label: 'Transcription marginalia widget' });
      },
    });

    // Convert the <transMarginNumber> model into an editable <span> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'transMarginNumber',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createContainerElement('span', 
          {
            class: 'trxn-number'
          });
        return toWidget(span, viewWriter);
      },
    });

    // Convert the <transMarginText> model into an editable <span> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'transMarginText',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createEditableElement('span', {
          class: 'trxn-text',
        });
        return toWidgetEditable(span, viewWriter);
      },
    });
  }
}
