var TodoApp = {
  todos: [],
  todoStatuses: ['pending', 'completed'],
  currentSorts: { pending: 'date', completed: 'date' },
  sortProperties: ['date', 'name'],

  initialize: function(){
    $('#new-todo').on('submit', $.proxy(this.itemSubmitted, this));
    $('#todo-lists').on('click', '.complete-todo', $.proxy(this.itemCompleted, this));
    $('#todo-lists').on('click', '.edit-todo', $.proxy(this.itemEdited, this));
    $('#todo-lists').on('click', '.update-todo', $.proxy(this.itemUpdated, this));
    $('#todo-lists').on('submit', '.name-form', $.proxy(this.itemUpdated, this));
    $('#todo-lists').on('click', '.cancel-edit-todo', $.proxy(this.itemEditCanceled, this));
    $('#todo-lists').on('click', '.delete-todo', $.proxy(this.itemDeleted, this));

    this.todoStatuses.forEach(function(status){
      var buttons = $('[data-list="' + status + '"] .sort-buttons');

      this.sortProperties.forEach(function(property){
        var button = $('<button>').
          attr('type', 'button').
          addClass('btn btn-default').
          data('sort', property).
          text(property).
          on('click', $.proxy(this.sortChanged, this));
        if(this.currentSorts[status] === property){ button.addClass('active'); }
        buttons.append(button);
      }, this);
    }, this);
  },

  itemSubmitted: function(event){
    try {
      var todo = new TodoItem($('#new-todo-name').val());
      this.todos.push(todo);
      this.rebuildLists();
      $('#new-todo-name').val('');
    } catch(error) {
      if(!error.validationError){ throw error; }
    }
    event.preventDefault();
  },

  itemCompleted: function(event){
    var todo = this.todoFromButtonEvent(event);
    todo.complete();
    this.rebuildLists();
  },

  itemEdited: function(event){
    var todo = this.todoFromButtonEvent(event);
    var $todo = $(event.currentTarget).parents('.todo');
    $todo.find('.name-display').hide();
    $todo.find('.buttons-main').hide();
    $todo.find('.name-input').show().focus().val(todo.name());
    $todo.find('.buttons-edit').show();
    $('button').not($todo.find('.buttons-edit button')).prop('disabled', true);
  },

  itemUpdated: function(event){
    var todo = this.todoFromButtonEvent(event);
    var $todo = $(event.currentTarget).parents('.todo');
    todo.rename($todo.find('.name-input').val());
    $('button').prop('disabled', false);
    this.rebuildLists();
  },

  itemEditCanceled: function(){
    $('button').prop('disabled', false);
    this.rebuildLists();
  },

  itemDeleted: function(event){
    var todo = this.todoFromButtonEvent(event);
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.rebuildLists();
  },

  sortChanged: function(event){
    var button = $(event.currentTarget);
    button.parents('.sort-buttons').find('button').toggleClass('active');
    this.currentSorts[button.parents('.todo-list').data('list')] = button.data('sort');
    this.rebuildLists();
  },

  rebuildLists: function(){
    $('.todos').empty();

    this.todoStatuses.forEach(function(status){
      var currentSortProperty = this.currentSorts[status];
      var sortedTodosWithStatus = this.todos.
        filter(function(todo){ return todo.status() === status; }).
        sort(function(a, b){ return a[currentSortProperty]() < b[currentSortProperty]() ? -1 : 1; });

      var todoList = $('[data-list="' + status + '"]');
      var appendTarget = todoList.find('.todos');
      todoList.find('.count').text(sortedTodosWithStatus.length);
      sortedTodosWithStatus.forEach(function(todo){
        appendTarget.append(todo.html());
      });
    }, this);
  },

  todoFromButtonEvent: function(event){
    var targetId = $(event.currentTarget).parents('.todo').data('id');
    return this.todos.filter(function(todo){ return todo.id === targetId; })[0];
  }
};
