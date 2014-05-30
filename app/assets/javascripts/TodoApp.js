var TodoApp = {
  todos: [],
  sorts: { pending: 'date', completed: 'date' },

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

  findTodo: function(targetId){
    return this.todos.filter(function(todo){ return todo.id === targetId; })[0];
  }
};
