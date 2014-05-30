var TodoApp = {
  todos: [],

  itemSubmitted: function(event){
    var todo = new TodoItem($('#new-todo-name').val());
    this.todos.push(todo);
    this.updateLists();
    $('#new-todo-name').val('');
    event.preventDefault();
  },

  itemCompleted: function(event){
    var todo = this.findTodo($(event.target).data('id'));
    todo.complete();
    this.updateLists();
  },

  itemDeleted: function(event){
    var todo = this.findTodo($(event.target).data('id'));
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateLists();
  },

  updateLists: function(){
    $('#todo-list-pending, #todo-list-completed').empty();
    this.todos.forEach(function(todo){
      if(todo.completedAt){
        $('#todo-list-completed').append(todo.html());
      } else {
        $('#todo-list-pending').append(todo.html());
      }
    });
  },

  findTodo: function(targetId){
    return $.grep(this.todos, function(todo){ return todo.id === targetId; })[0];
  }
};
