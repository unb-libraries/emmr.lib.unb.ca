/**
 * @file registers the transInsert toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/transInsert.svg';

export default class TransInsertUI extends Plugin {
  init() {
    const editor = this.editor;

    // This will register the transInsert toolbar button.
    editor.ui.componentFactory.add('transInsert', (locale) => {
      const command = editor.commands.get('insertTransInsert');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t('Transcription Insert'),
        icon,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertTransInsert'),
      );

      return buttonView;
    });
  }
}
