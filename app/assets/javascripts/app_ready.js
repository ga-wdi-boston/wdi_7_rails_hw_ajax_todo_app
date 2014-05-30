$(document).ready(function() {
  $('#new-todo').on('submit', $.proxy(TodoApp.itemSubmitted, TodoApp));
  $('#todo-lists').on('click', '.complete-todo', $.proxy(TodoApp.itemCompleted, TodoApp));
  $('#todo-lists').on('click', '.delete-todo', $.proxy(TodoApp.itemDeleted, TodoApp));
  $('[data-sort]').on('click', $.proxy(TodoApp.sortChanged, TodoApp));

  $('#new-todo-name').focus();
});
