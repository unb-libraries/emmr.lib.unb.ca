/**
 * @file registers the transReplace toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/transReplace.svg';

export default class TransReplaceUI extends Plugin {
  init() {
    const editor = this.editor;

    // This will register the transReplace toolbar button.
    editor.ui.componentFactory.add('transReplace', (locale) => {
      const command = editor.commands.get('insertTransReplace');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t('Transcription Replace'),
        icon,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertTransReplace'),
      );

      return buttonView;
    });
  }
}
