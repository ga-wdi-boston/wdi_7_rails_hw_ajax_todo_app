$(document).ready(function() {
  $('#new-todo').on('submit', $.proxy(TodoApp.itemSubmitted, TodoApp));
  $('#todo-lists').on('click', '.complete-todo', $.proxy(TodoApp.itemCompleted, TodoApp));
  $('#todo-lists').on('click', '.delete-todo', $.proxy(TodoApp.itemDeleted, TodoApp));
  $('[data-sort]').on('click', $.proxy(TodoApp.sortChanged, TodoApp));
  $.each(TodoApp.sorts, function(list, sort){
    $('[data-list="' + list + '"][data-sort="' + sort + '"]').addClass('active');
  });

  $('#new-todo-name').focus();
});
