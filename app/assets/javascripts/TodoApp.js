var TodoApp = {
  todos: [], // Master list of todos currently stored in the app
  currentSorts: {}, // Keeps track of which list is sorted by which property

  initialize: function(){
    this.initializeSorts();
    this.initializeLists();
    this.loadInitialData();

    $('#new-todo').on('submit', $.proxy(this.itemSubmitted, this));
    $('.sort-buttons').on('click', 'button', $.proxy(this.sortChanged, this));
    this.createTodoHandler('click', '.complete-todo', this.itemCompleted);
    this.createTodoHandler('click', '.edit-todo', this.itemEdited);
    this.createTodoHandler('click', '.update-todo', this.itemUpdated);
    this.createTodoHandler('submit', '.name-form', this.itemUpdated);
    this.createTodoHandler('click', '.cancel-edit-todo', this.itemEditCanceled);
    this.createTodoHandler('click', '.delete-todo', this.itemDeleted);
  },

  // Render the initial list markup and sort buttons, according to the possible
  // todo item statuses and sortable properties
  initializeLists: function(){
    $('#todo-lists').append(HandlebarsTemplates.todoList({
      statuses: TodoItem.statuses,
      sortableProperties: TodoItem.sortableProperties
    }));
  },

  // Set the active sort property for each list to the first sortable property
  // of todo items
  initializeSorts: function(){
    TodoItem.statuses.forEach(function(status){
      this.currentSorts[status] = TodoItem.sortableProperties[0];
    }, this);
  },

  // Wrapper around $.on for attaching events on any elements that are children
  // of an element with class "todo". Instead of being called with an `event`
  // argument, the handler function will be called with a `$todo` argument that
  // is the parent element with class "todo", and a `todo` argument that is the
  // corresponding TodoItem object. This is done by dynamically generating an
  // event handler function that retrieves these variables before handing them
  // off to the handler function originally passed in.
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

  // Populate the local list of todos from the database
  loadInitialData: function(){
    $.ajax({
      dataType: 'json',
      url: Routes.todosPath()
    })
    .done($.proxy(function(data){
      this.todos = data.map(function(attrs){
        return new TodoItem(attrs);
      });
      this.rebuildLists();
    }, this))
    .fail(this.genericFailure);
  },

  // User submitted a new todo item
  itemSubmitted: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    $form.find('button').prop('disabled', true);

    $.ajax({
      url: $form.attr('action'),
      type: 'POST',
      dataType: 'json',
      data: { todo: { name: $('#todo_name').val() }} // TODO: Real serialization
    })
    .done($.proxy(function(data){
      this.todos.push(new TodoItem(data));
      this.rebuildLists();
      $form.find('input').val('');
    }, this))
    .fail($.proxy(function(jqXHR){
      if(jqXHR.status === 422){
        this.validationFailure(jqXHR.responseJSON.errors, $form);
      } else {
        this.genericFailure(jqXHR);
      }
    }, this))
    .always(function(){
      $form.find('button').prop('disabled', false);
    });
  },

  // User completed a todo item
  itemCompleted: function(todo, $todo){
    var completedAt = new Date();

    this.todoAjax(todo, $todo, 'PATCH', { completed_at: completedAt })
    .done($.proxy(function(){
      todo.complete(completedAt);
      this.rebuildLists();
    }, this));
  },

  // User started editing a todo item. Since most app actions cause the lists to
  // be rebuilt from scratch, and this would lose the user's editing state, all
  // buttons in the app are disabled while editing except for the ones that will
  // either save or discard the edit.
  itemEdited: function(todo, $todo){
    $todo.find(
      '.name-display, .buttons-main, .name-input, .buttons-edit'
    ).toggleClass('hidden');
    $todo.find('.name-input').focus().val(todo.name());
    $('button').not($todo.find('.buttons-edit button')).prop('disabled', true);
  },

  // User finished editing a todo item
  itemUpdated: function(todo, $todo){
    var name = $todo.find('.name-input').val();

    this.todoAjax(todo, $todo, 'PATCH', { name: name })
    .done($.proxy(function(){
      todo.rename(name);
      $('button').prop('disabled', false);
      this.rebuildLists();
    }, this));
  },

  // User canceled editing a todo item
  itemEditCanceled: function(){
    $('button').prop('disabled', false);
    this.rebuildLists();
  },

  // User deleted a todo item
  itemDeleted: function(todo, $todo){
    this.todoAjax(todo, $todo, 'DELETE')
    .done($.proxy(function(){
      this.todos.splice(this.todos.indexOf(todo), 1);
      this.rebuildLists();
    }, this));
  },

  // User changed the sorting of a list
  sortChanged: function(event){
    var button = $(event.currentTarget);
    var status = button.parents('.todo-list').data('status');
    this.currentSorts[status] = button.data('sort');
    this.rebuildLists();
  },

  // Rebuilds the complete HTML of the todo lists in the document, taking todo
  // status and current sort properties into account. Should be called whenever
  // any todo is created, updated, or deleted. This "destroy-the-world" approach
  // is simple, but wouldn't be very efficient with large numbers of objects.
  rebuildLists: function(){
    $('[data-sort]').removeClass('active');
    $.each(this.currentSorts, function(status, property){
      $('[data-status=' + status + '] [data-sort=' + property + ']').addClass('active');
    });

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
  },

  // Generic Ajax function to update or delete a specific todo item. Returns the
  // same object returned by `$.ajax`, so custom `done` handlers may be chained.
  // Ensures all buttons related to the todo are disabled during the request.
  todoAjax: function(todo, $todo, type, todoAttributes){
    $todo.find('button').prop('disabled', true);

    return $.ajax({
      url: Routes.todoPath(todo.id),
      type: type,
      dataType: 'json',
      data: { todo: todoAttributes }
    })
    .fail(this.genericFailure)
    .always(function(){
      $todo.find('button').prop('disabled', false);
    });
  },

  // Handler for failed Ajax requests that we don't know how to recover from
  genericFailure: function(jqXHR){
    alert('Error ' + jqXHR.status + ' occurred. Try refreshing maybe?');
  },

  // Handler for Ajax form submissions that failed due to a validation error
  validationFailure: function(errors, $form){
    var errorString = $.map(errors, function(messages, attribute){
      return messages.map(function(message){
        return attribute + ' ' + message;
      }).join(', ');
    }).join(', ');

    $form.tooltip('destroy');
    $form.tooltip(
      { title: errorString, trigger: 'manual', placement: 'left' }
    );
    $form.tooltip('show');
    setTimeout(function(){ $form.tooltip('destroy'); }, 2000);
  }
};
