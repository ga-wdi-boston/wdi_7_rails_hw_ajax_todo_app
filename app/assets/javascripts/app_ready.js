$(document).ready(function() {
  $('#new-todo').on('submit', $.proxy(TodoApp.itemSubmitted, TodoApp));
  $('#todo-lists').on('click', '.complete-todo', $.proxy(TodoApp.itemCompleted, TodoApp));

  $('#new-todo-name').focus();
});
