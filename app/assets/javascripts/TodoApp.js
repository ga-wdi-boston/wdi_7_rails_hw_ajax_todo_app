var TodoApp = {
  initialize: function(){
    this.todos = [];
    this.currentSorts = {};
    TodoItem.statuses.forEach(function(status, index){
      this.currentSorts[status] = TodoItem.sortableProperties[0];
      $('.todo-list').eq(index).
        attr('data-status', status).
        find('.count').text('0').end().
        find('.status').text(status);
    }, this);

    $('#new-todo').on('submit', $.proxy(this.itemSubmitted, this));
    this.createTodoHandler('click', '.complete-todo', this.itemCompleted);
    this.createTodoHandler('click', '.edit-todo', this.itemEdited);
    this.createTodoHandler('click', '.update-todo', this.itemUpdated);
    this.createTodoHandler('submit', '.name-form', this.itemUpdated);
    this.createTodoHandler('click', '.cancel-edit-todo', this.itemEditCanceled);
    this.createTodoHandler('click', '.delete-todo', this.itemDeleted);
    this.createSortButtons();
  },

  createTodoHandler: function(event, selector, handler){
    handler = $.proxy(handler, this);
    var handlerWrapper = $.proxy(function(event){
      var $todo = $(event.currentTarget).parents('.todo');
      var todo = this.todos.filter(function(todo){
        return todo.id === $todo.data('id');
      })[0];
      handler(todo, $todo);
      event.preventDefault();
    }, this);
    $('#todo-lists').on(event, selector, handlerWrapper);
  },

  createSortButtons: function(){
    TodoItem.statuses.forEach(function(status){
      var buttons = $('[data-status="' + status + '"] .sort-buttons');

      TodoItem.sortableProperties.forEach(function(property){
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

  itemCompleted: function(todo){
    todo.complete();
    this.rebuildLists();
  },

  itemEdited: function(todo, $todo){
    $todo.find('.name-display').hide();
    $todo.find('.buttons-main').hide();
    $todo.find('.name-input').show().focus().val(todo.name());
    $todo.find('.buttons-edit').show();
    $('button').not($todo.find('.buttons-edit button')).prop('disabled', true);
  },

  itemUpdated: function(todo, $todo){
    todo.rename($todo.find('.name-input').val());
    $('button').prop('disabled', false);
    this.rebuildLists();
  },

  itemEditCanceled: function(){
    $('button').prop('disabled', false);
    this.rebuildLists();
  },

  itemDeleted: function(todo){
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.rebuildLists();
  },

  sortChanged: function(event){
    var button = $(event.currentTarget);
    button.parents('.sort-buttons').find('button').toggleClass('active');
    this.currentSorts[button.parents('.todo-list').data('status')] = button.data('sort');
    this.rebuildLists();
  },

  rebuildLists: function(){
    $('.todos').empty();

    TodoItem.statuses.forEach(function(status){
      var currentSortProperty = this.currentSorts[status];
      var sortedTodosWithStatus = this.todos.
        filter(function(todo){ return todo.status() === status; }).
        sort(function(a, b){ return a[currentSortProperty]() < b[currentSortProperty]() ? -1 : 1; });

      var todoList = $('[data-status="' + status + '"]');
      var appendTarget = todoList.find('.todos');
      todoList.find('.count').text(sortedTodosWithStatus.length);
      sortedTodosWithStatus.forEach(function(todo){
        appendTarget.append(todo.html());
      });
    }, this);
  }
};
