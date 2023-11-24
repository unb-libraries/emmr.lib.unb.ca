/**
 * @file registers the transMargin toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/transMargin.svg';

export default class TransMarginUI extends Plugin {
  init() {
    const editor = this.editor;

    // This will register the transMargin toolbar button.
    editor.ui.componentFactory.add('transMargin', (locale) => {
      const command = editor.commands.get('insertTransMargin');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t('Transcription Marginalia'),
        icon,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertTransMargin'),
      );

      return buttonView;
    });
  }
}
