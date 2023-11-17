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
 *    <transReplaceCaret></transReplaceCaret>
 *    <transReplaceText></transReplaceText>
 * </transReplace>
 *
 * Which is converted for the browser/user as this markup
 * <trxn>
 *   <span class="trxn-caret"></span>
 *   <span class="trxn-text"></span>
 * </trxn>
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
   *    <transReplaceCaret></transReplaceCaret>
   *    <transReplaceText></transReplaceText>
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
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
    });

    schema.register('transReplaceCaret', {
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
      allowContentOf: '$root',
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
        name: 'trxn',
      },
    });

    // If <span class="trxn-caret"> is present in the existing markup
    // processed by CKEditor, then CKEditor recognizes and loads it as a
    // <transReplaceCaret> model, provided it is a child element of <transReplace>,
    // as required by the schema.
    conversion.for('upcast').elementToElement({
      model: 'transReplaceCaret',
      view: {
        name: 'span',
        classes: 'trxn-caret',
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
        classes: 'trxn-text',
      },
    });

    // Data Downcast Converters: converts stored model data into HTML.
    // These trigger when content is saved.
    //
    // Instances of <transReplace> are saved as
    // <trxn>{{inner content}}</trxn>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transReplace',
      view: {
        name: 'trxn',
      },
    });

    // Instances of <transReplaceCaret> are saved as
    // <span class="trxn-caret">{{inner content}}</span>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transReplaceCaret',
      view: {
        name: 'span',
        classes: 'trxn-caret',
      },
    });

    // Instances of <transReplaceText> are saved as
    // <span class="trxn-text">{{inner content}}</span>.
    conversion.for('dataDowncast').elementToElement({
      model: 'transReplaceText',
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
    // Convert the <transReplace> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'transReplace',
      view: (modelElement, { writer: viewWriter }) => {
        const trxn = viewWriter.createContainerElement('trxn', {});

        return toWidget(trxn, viewWriter, { label: 'Transtation insert widget' });
      },
    });

    // Convert the <transReplaceCaret> model into an editable <span> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'transReplaceCaret',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createContainerElement('span', 
          {
            class: 'trxn-caret'
          });
        return toWidget(span, viewWriter);
      },
    });

    // Convert the <transReplaceText> model into an editable <span> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'transReplaceText',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createEditableElement('span', {
          class: 'trxn-text',
        });
        return toWidgetEditable(span, viewWriter);
      },
    });
  }
}
