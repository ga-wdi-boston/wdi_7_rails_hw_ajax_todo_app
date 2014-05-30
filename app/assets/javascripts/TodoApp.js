var TodoApp = {
  pendingTodos: [],
  completedTodos: [],

  itemSubmitted: function(event){
    var todo = new TodoItem($('#new-todo-name').val());
    this.pendingTodos.push(todo);
    this.updateLists();
    $('#new-todo-name').val('');
    event.preventDefault();
  },

  itemCompleted: function(event){
    var targetId = $(event.target).data('id');
    var todo = $.grep(this.pendingTodos, function(todo){ return todo.id === targetId; })[0];
    todo.complete();
    this.pendingTodos.splice(this.pendingTodos.indexOf(todo), 1);
    this.completedTodos.push(todo);
    this.updateLists();
  },

  updateLists: function(){
    $('#todo-list-pending, #todo-list-completed').empty();
    this.pendingTodos.forEach(function(todo){ $('#todo-list-pending').append(todo.html()); });
    this.completedTodos.forEach(function(todo){ $('#todo-list-completed').append(todo.html()); });
  }
};
