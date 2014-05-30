var TodoApp = {
  todos: [],
  sorts: { pending: 'date', completed: 'date' },
  sortProperties: ['date', 'name'],

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
    button.parents('.sort-buttons').find('button').toggleClass('active');
    this.sorts[button.parents('.todo-list').data('list')] = button.data('sort');
    this.updateLists();
  },

  initSortButtons: function(){
    var sorts = this.sorts;
    var sortProperties = this.sortProperties;

    Object.keys(sorts).forEach(function(status){
      var buttons = $('[data-list="' + status + '"] .sort-buttons');

      sortProperties.forEach(function(property){
        var button = $('<button>').
          attr('type', 'button').
          addClass('btn btn-default').
          attr('data-sort', property).
          text(property);
        if(sorts[status] === property){ button.addClass('active'); }
        buttons.append(button);
      });
    });
  },

  updateLists: function(){
    $('.todos').empty();
    var sorts = this.sorts;
    var todos = this.todos;

    Object.keys(sorts).forEach(function(status){
      var todosWithStatus = todos.
        filter(function(todo){ return todo.status() === status; }).
        sort(function(a, b){ return a[sorts[status]]() < b[sorts[status]]() ? -1 : 1; });

      var targetList = $('[data-list="' + status + '"] .todos');
      todosWithStatus.forEach(function(todo){ targetList.append(todo.html()); });
    });
  },

  todoFromButtonEvent: function(event){
    var targetId = $(event.target).data('id');
    return this.todos.filter(function(todo){ return todo.id === targetId; })[0];
  }
};
