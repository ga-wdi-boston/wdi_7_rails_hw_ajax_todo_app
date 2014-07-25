$(document).ready(function() {
  TodoList.getTodos();
  TodoList.initialize('#new-todo-form', '#todo-filters', '#todo-table');
  $('#new-todo-name').focus();
});
