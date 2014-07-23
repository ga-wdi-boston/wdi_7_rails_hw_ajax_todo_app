var TodoList = {
  initialize: function(todoFormID, todoFiltersID, todoTableID) {
    this.$todoForm = $(todoFormID);
    this.$todoFilters = $(todoFiltersID);
    this.$todoTable = $(todoTableID);

    this.$todoForm.submit(this.createTodo.bind(this));

    this.$todoFilters.on('click', 'a', this.setActiveClass.bind(this));

    this.$todoTable.on('click',"a[title='Delete']", this.deleteTodo.bind(this));
    this.$todoTable.on('click',"a[title='Complete']", this.completeTodo.bind(this));
  },

  setActiveClass: function(event) {
    var $filters = $(event.target).closest('#todo-filters').find('dd'),
      targetFilter = $(event.target).attr('id');

    $filters.each(function(i, filter){
      $(filter).removeClass('active');
    });

    $(event.target).closest('dd').addClass('active');
    this.$todoTable.data('list', targetFilter);

    event.preventDefault();
    this.getTodos();
  },

  getTodos: function() {
    $.ajax({
      url: "/todos",
    })
    .done(this.showTodoList.bind(this));
  },

  showTodoList: function(todos) {
    var todoHTML = "",
      todoItem,
      filteredTodos;

    this.$todoTable.empty();

    if(this.$todoTable.data('list') === 'all-todos') {
      filteredTodos = todos;
    } else if(this.$todoTable.data('list') === 'active-todos') {
      filteredTodos = todos.filter(function(todo) {
        return todo.completed_at === null;
      });
    } else if(this.$todoTable.data('list') === 'completed-todos') {
      filteredTodos = todos.filter(function(todo) {
        return todo.completed_at !== null;
      });
    }

    filteredTodos.forEach(function(filteredTodo){
      todoItem = new TodoItem(filteredTodo.id, filteredTodo.name, filteredTodo.created_at, filteredTodo.completed_at);
      TodoList.$todoTable.append(todoItem.html());
    });
  },

  createTodo: function(event) {
    var $form = $(event.currentTarget),
      $name = $form.find("input[name='name']"),
      newTodo = { todo: { name: $name.val() }};

    $name.val("");

    event.preventDefault();
    $.ajax({
      url: "/todos",
      type: "POST",
      data: newTodo
    })
    .done(this.getTodos.bind(this));
  },

  deleteTodo: function(event) {
    var todoID = $(event.currentTarget).closest('tr').data('id');
      todoItem = { todo: { id: todoID }};

    event.preventDefault();
    $.ajax({
      url: "/todos/" + todoID,
      type: "DELETE",
      data: todoItem
    })
    .done(this.getTodos.bind(this));
  },

  completeTodo: function(event) {
    var todoID = $(event.currentTarget).closest('tr').data('id');
      todoItem = { todo: { id: todoID, completed_at: new Date() }};

    event.preventDefault();
    $.ajax({
      url: "/todos/" + todoID,
      type: "PATCH",
      data: todoItem
    })
    .done(this.getTodos.bind(this));
  }
};
