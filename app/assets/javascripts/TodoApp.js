var TodoApp = {
  todos: [],
  sorts: { pending: 'date', completed: 'date' },

  itemSubmitted: function(event){
    try {
      var todo = new TodoItem($('#new-todo-name').val());
      this.todos.push(todo);
      this.updateLists();
      $('#new-todo-name').val('');
    } catch(error) {
      if(!error.validationError){ throw error; }
    }
    event.preventDefault();
  },

  itemCompleted: function(event){
    var todo = this.todoFromButtonEvent(event);
    todo.complete();
    this.updateLists();
  },

  itemDeleted: function(event){
    var todo = this.todoFromButtonEvent(event);
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateLists();
  },

  sortChanged: function(event){
    var button = $(event.target);
    button.parent().find('button').toggleClass('active');
    this.sorts[button.data('list')] = button.data('sort');
    this.updateLists();
  },

  updateLists: function(){
    $('.todo-list').empty();
    var sorts = this.sorts;
    var todos = this.todos;

    ['pending', 'completed'].forEach(function(status){
      var todosWithStatus = todos.
        filter(function(todo){ return todo.status() === status; }).
        sort(function(a, b){ return a[sorts[status]]() < b[sorts[status]]() ? -1 : 1; });

      var targetList = $('.todo-list[data-list="' + status + '"]');
      todosWithStatus.forEach(function(todo){ targetList.append(todo.html()); });
    });
  },

  todoFromButtonEvent: function(event){
    var targetId = $(event.target).data('id');
    return this.todos.filter(function(todo){ return todo.id === targetId; })[0];
  }
};
