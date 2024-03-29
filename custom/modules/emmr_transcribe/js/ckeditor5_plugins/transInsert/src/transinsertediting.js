import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertTransInsertCommand from './inserttransinsertcommand';

// cSpell:ignore transinsert inserttransinsertcommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with transInsert as this model:
 * <transInsert>
 *    <transInsertSelect></transInsertSelect>
 *    <transInsertCaret></transInsertCaret>
 *    <transInsertText></transInsertText>
 * </transInsert>
 *
 * Which is converted for the browser/user as this markup
 * <trxnin>
 *   <span class="trxn-select"></span>
 *   <span class="trxn-caret"></span>
 *   <span class="trxn-text"></span>
 * </trxnin>
 *
 * This file has the logic for defining the transInsert model, and for how it is
 * converted to standard DOM markup.
 */
export default class TransInsertEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertTransInsert',
      new InsertTransInsertCommand(this.editor),
    );
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <transInsert>
   *    <transInsertSelect></transInsertSelect>
   *    <transInsertCaret></transInsertCaret>
   *    <transInsertText></transInsertText>
   * </transInsert>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('transInsert', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$text',
    });

    schema.register('transInsertSelect', {
      // This creates a boundary for external actions such as clicking and
      // and keypress. For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      isLimit: true,
      // This is only to be used within transInsert.
      allowIn: 'transInsert',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      allowContentOf: '$block',
    });

    schema.register('transInsertCaret', {
      // This creates a boundary for external actions such as clicking and
      // and keypress. For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      isLimit: true,
      // This is only to be used within transInsert.
      allowIn: 'transInsert',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      allowContentOf: '$block',
    });

    schema.register('transInsertText', {
      isLimit: true,
      allowIn: 'transInsert',
      allowContentOf: '$block',
    });

    schema.addChildCheck((context, childDefinition) => {
      // Disallow transInsert inside self or any children.
      if (
        context.startsWith('trans') &&
        childDefinition.name === 'transInsert'
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
    // If <trxnin> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transInsert> model.
    conversion.for('upcast').elementToElement({
      model: 'transInsert',
      view: {
        name: 'trxnin',
      },
    });

    // If <span class="trxn-select"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transInsertSelect> model, provided it is a child element of <transInsert>,
    // as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'transInsertSelect',
      view: {
        name: 'span',
        classes: [ 'trxn-select', 'glyphicon', 'glyphicon-pencil' ],
      },
    });

    // If <span class="trxn-caret"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transInsertCaret> model, provided it is a child element of <transInsert>,
    // as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'transInsertCaret',
      view: {
        name: 'span',
        classes: 'trxn-caret',
      },
    });

    // If <span class="trxn-text"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transInsertText> model, provided it is a child element of
    // <transInsert>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'transInsertText',
      view: {
        name: 'span',
        classes: 'trxn-text',
      },
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <transInsert> are saved as
    // <trxnin>{{inner content}}</trxnin>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transInsert',
      view: {
        name: 'trxnin',
      },
    });

    // Instances of <transInsertSelect> are saved as
    // <span class="trxn-select">{{inner content}}</span>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transInsertSelect',
      view: {
        name: 'span',
        classes: [ 'trxn-select', 'glyphicon', 'glyphicon-pencil' ],
      },
    });

    // Instances of <transInsertCaret> are saved as
    // <span class="trxn-caret">{{inner content}}</span>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transInsertCaret',
      view: {
        name: 'span',
        classes: 'trxn-caret',
      },
    });

    // Instances of <transInsertText> are saved as
    // <span class="trxn-text">{{inner content}}</span>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transInsertText',
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
    // Convert the <transInsert> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'transInsert',
      view: (modelElement, { writer: viewWriter }) => {
        const trxnin = viewWriter.createContainerElement('trxnin', {});

        return toWidget(trxnin, viewWriter, { label: 'Transcription insert widget' });
      },
    });

    // Convert the <transInsertSelect> model into a non-editable <span> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'transInsertSelect',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createContainerElement('span', 
          {
            class: 'trxn-select glyphicon glyphicon-pencil'
          });
        return toWidget(span, viewWriter);
      },
    });

    // Convert the <transInsertCaret> model into a non-editable <span> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'transInsertCaret',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createContainerElement('span', 
          {
            class: 'trxn-caret'
          });
        return toWidget(span, viewWriter);
      },
    });

    // Convert the <transInsertText> model into an editable <span> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'transInsertText',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createEditableElement('span', {
          class: 'trxn-text',
        });
        return toWidgetEditable(span, viewWriter);
      },
    });
  }
}
