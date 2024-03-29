import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertTransReplaceCommand from './inserttransreplacecommand';

// cSpell:ignore transreplace inserttransreplacecommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * CKEditor 5 internally interacts with transReplace as this model:
 * <transReplace>
 *    <transReplaceSelect></transReplaceSelect>
 *    <transReplaceText></transReplaceText>
 *    <transReplaceOld></transReplaceOld>
 * </transReplace>
 *
 * Which is converted for the browser/user as this markup
 * <trxnrep>
 *   <span class="trxn-select"></span>
 *   <span class="trxn-retext"></span>
 *   <s class="trxn-replaced"></s>
 * </trxnrep>
 *
 * This file has the logic for defining the transReplace model, and for how it is
 * converted to standard DOM markup.
 */
export default class TransReplaceEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertTransReplace',
      new InsertTransReplaceCommand(this.editor),
    );
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <transReplace>
   *    <transReplaceSelect></transReplaceSelect>
   *    <transReplaceText></transReplaceText>
   *    <transReplaceOld></transReplaceOld>
   * </transReplace>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('transReplace', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where text is allowed.
      allowWhere: '$text',
    });

    schema.register('transReplaceSelect', {
      // This creates a boundary for external actions such as clicking and
      // and keypress. For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      isLimit: true,
      // This is only to be used within transReplace.
      allowIn: 'transReplace',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      allowContentOf: '$block',
    });

    schema.register('transReplaceOld', {
      // This creates a boundary for external actions such as clicking and
      // and keypress. For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      isLimit: true,
      // This is only to be used within transReplace.
      allowIn: 'transReplace',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      allowContentOf: '$block',
    });

    schema.register('transReplaceText', {
      isLimit: true,
      allowIn: 'transReplace',
      allowContentOf: '$block',
    });

    schema.addChildCheck((context, childDefinition) => {
      // Disallow transReplace inside self or any children.
      if (
        context.startsWith('trans') &&
        childDefinition.name === 'transReplace'
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
    // If <span class="transReplace"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transReplace> model.
    conversion.for('upcast').elementToElement({
      model: 'transReplace',
      view: {
        name: 'trxnrep',
      },
    });

    // If <span class="trxn-select"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transReplaceSelect> model, provided it is a child element of <transReplace>,
    // as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'transReplaceSelect',
      view: {
        name: 'span',
        classes: [ 'trxn-select', 'glyphicon', 'glyphicon-pencil' ],
      },
    });

    // If <s class="trxn-replaced"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transReplaceOld> model, provided it is a child element of <transReplace>,
    // as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'transReplaceOld',
      view: {
        name: 's',
        classes: 'trxn-replaced',
      },
    });

    // If <span class="trxn-text"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transReplaceText> model, provided it is a child element of
    // <transReplace>, as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'transReplaceText',
      view: {
        name: 'span',
        classes: 'trxn-retext',
      },
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <transReplace> are saved as
    // <trxnrep>{{inner content}}</trxnrep>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transReplace',
      view: {
        name: 'trxnrep',
      },
    });

    // Instances of <transReplaceSelect> are saved as
    // <span class="trxn-select">{{inner content}}</span>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transReplaceSelect',
      view: {
        name: 'span',
        classes: [ 'trxn-select', 'glyphicon', 'glyphicon-pencil' ],
      },
    });

    // Instances of <transReplaceOld> are saved as
    // <s class="trxn-replaced">{{inner content}}</s>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transReplaceOld',
      view: {
        name: 's',
        classes: 'trxn-replaced',
      },
    });

    // Instances of <transReplaceText> are saved as
    // <span class="trxn-text">{{inner content}}</span>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transReplaceText',
      view: {
        name: 'span',
        classes: 'trxn-retext',
      },
   });

    // Editing Downcast Converters. These render the content to the user for
    // editing, i.e. this determines what gets seen in the editor. These trigger
    // after the Data Upcast Converters, and are re-triggered any time there
    // are changes to any of the models' properties.
    //
    // Convert the <transReplace> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'transReplace',
      view: (modelElement, { writer: viewWriter }) => {
        const trxnrep = viewWriter.createContainerElement('trxnrep', {});

        return toWidget(trxnrep, viewWriter, { label: 'Transcription replacement widget' });
      },
    });

    // Convert the <transReplaceSelect> model into a non-editable <span> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'transReplaceSelect',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createContainerElement('span', 
          {
            class: 'trxn-select glyphicon glyphicon-pencil'
          });
        return toWidget(span, viewWriter);
      },
    });    

    // Convert the <transReplaceOld> model into an editable <s> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'transReplaceOld',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createContainerElement('s', 
          {
            class: 'trxn-replaced'
          });
        return toWidget(span, viewWriter);
      },
    });

    // Convert the <transReplaceText> model into an editable <span> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'transReplaceText',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createEditableElement('span', {
          class: 'trxn-retext',
        });
        return toWidgetEditable(span, viewWriter);
      },
    });
  }
}
