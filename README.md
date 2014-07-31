# Ajax Todo App on Rails

*"To do or not to do, that is the question..."*

The goal of this assignment is to rebuild your [JavaScript todo app](https://github.com/ga-wdi-boston/wdi_6_js_hw_todo_app) as a fully functional single-page app, using Ajax JSON requests to a Rails backend. Initially you'll use JavaScript with manual jQuery element creation, as we did for the standalone version, but later we'll convert the app to use CoffeeScript and Handlebars templates.

It might not be a good idea to start *directly* from the code you used in the previous assignment, due to probable architectural differences &ndash; but you are encouraged to copy techniques from it, or from the `only-js` branch of this repo (which is the example solution for the JavaScript-only todo app).

## Basic Functionality

1. The UI should have three main components: A list of "todo" items, a list of "done" items, and an input field with a button to create new items.
2. Typing in the input field and pressing Enter or clicking the button should create a new item in the "todo" list.
3. The app should not allow entering a todo item with no text.
4. Each item in the "todo" list should display the text entered for it, the date/time it was submitted, a "complete" button, and a "delete" button.
5. Clicking the "complete" button on an item should move it to the "done" list.
6. Each item in the "done" list should display the text entered for it, the date/time it was *completed*, and a "delete" button.
7. Clicking the "delete" button on any item should remove it from the app.
8. The "todo" and "done" lists should each display a count of items in that list.

## Extra Functionality

Consider these specifications only once you have all of the above functionality working.

1. Each item in both lists should display an "edit" button. Clicking this button should transform the todo content into an editable text field, and replace the button itself with "save" and "cancel" buttons that will update the todo with new content or cancel the edit, respectively.
2. Each todo list should display two sort buttons, which allow that list to be sorted either by date or alphabetically. "Date" should be creation date for the "todo" list, and completion date for the "done" list.
3. The app should not allow entering a todo item whose text is identical to an existing todo item. All validations should be enforced on the server side.
4. Add attractive styles to your app using a CSS framework, and apply jQuery animations to bring it to life. Provide visual feedback while your app is loading data or waiting on a server response.
