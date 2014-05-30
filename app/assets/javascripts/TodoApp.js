var TodoApp = {
  pendingTodos: [],
  completedTodos: [],

  itemSubmitted: function(event){
    var todo = new TodoItem($('#new-todo-name').val());
    $('#todo-list-pending').append(todo.html());
    this.pendingTodos.push(todo);
    $('#new-todo-name').val('');
    event.preventDefault();
  }
};
