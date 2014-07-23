$(document).ready(function() {
  TodoList.getTodos();
  TodoList.initialize('#new-todo-form', '#todo-table');
  $('#new-todo-name').focus();
});
