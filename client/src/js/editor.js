// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded. Please ensure that the CodeMirror library is included correctly.');
    }

    // Initialize CodeMirror editor
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Load data from IndexedDB or localStorage
    getDb()
      .then((data) => {
        console.info('Loaded data from IndexedDB, injecting into editor');
        this.editor.setValue(data || localData || header);
      })
      .catch((error) => {
        console.error('Error loading data from IndexedDB:', error);
        // Handle the error, such as falling back to localStorage or displaying a user-friendly message
      });

    // Save the content of the editor to IndexedDB when it loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'))
        .catch((error) => {
          console.error('Error saving data to IndexedDB:', error);
          // Handle the error, such as displaying a user-friendly message
        });
    });

    // Update localStorage when the editor content changes
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });
  }
}
