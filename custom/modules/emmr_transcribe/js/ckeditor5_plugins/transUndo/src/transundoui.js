/**
 * @file registers the transUndo toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/transUndo.svg';

export default class TransUndoUI extends Plugin {
  init() {
    const editor = this.editor;

    // This will register the transUndo toolbar button.
    editor.ui.componentFactory.add('transUndo', (locale) => {
      const command = editor.commands.get('insertTransUndo');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t('Transcription Undo'),
        icon,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertTransUndo'),
      );

      return buttonView;
    });
  }
}
