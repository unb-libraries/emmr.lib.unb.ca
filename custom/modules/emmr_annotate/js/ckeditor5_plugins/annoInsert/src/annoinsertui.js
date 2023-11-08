/**
 * @file registers the simpleBox toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/simpleBox.svg';

export default class AnnoInsertUI extends Plugin {
  init() {
    const editor = this.editor;

    // This will register the simpleBox toolbar button.
    editor.ui.componentFactory.add('annoInsert', (locale) => {
      const command = editor.commands.get('insertAnnoInsert');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: editor.t('Annotation Insert'),
        icon,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertAnnoInsert'),
      );

      return buttonView;
    });
  }
}
