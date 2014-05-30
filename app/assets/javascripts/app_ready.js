$(document).ready(function() {
  $('#new-todo').on('submit', $.proxy(TodoApp.itemSubmitted, TodoApp));

  $('#new-todo-name').focus();
});
