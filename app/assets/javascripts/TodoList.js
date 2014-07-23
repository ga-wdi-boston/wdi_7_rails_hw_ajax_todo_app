var TodoList = {
  initialize: function(todoFormID, todoFiltersID, todoTableID) {
    this.$todoForm = $(todoFormID);
    this.$todoFilters = $(todoFiltersID);
    this.$todoTable = $(todoTableID);

    this.$todoForm.submit(this.createTodo.bind(this));

    this.$todoFilters.on('click', 'a', this.setActiveClass.bind(this));

    this.$todoTable.on('click',"a[title='Delete']", this.deleteTodo.bind(this));
    this.$todoTable.on('click',"a[title='Complete']", this.completeTodo.bind(this));
    this.$todoTable.on('dblclick', '.todo-name', this.editTodo.bind(this));
    this.$todoTable.on('submit', '#edit-todo-form', this.submitTodoChange.bind(this));
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
      filteredTodos,
      targetFilter;

    this.$todoTable.empty();

    if(this.$todoTable.data('list') === 'all-todos') {
      filteredTodos = todos;
      targetFilter = "Total";
    } else if(this.$todoTable.data('list') === 'active-todos') {
      filteredTodos = todos.filter(function(todo) {
        return todo.completed_at === null;
      });
      targetFilter = "Active";
    } else if(this.$todoTable.data('list') === 'completed-todos') {
      filteredTodos = todos.filter(function(todo) {
        return todo.completed_at !== null;
      });
      targetFilter = "Completed";
    }

    filteredTodos.forEach(function(filteredTodo){
      todoItem = new TodoItem(filteredTodo.id, filteredTodo.name, filteredTodo.created_at, filteredTodo.completed_at, filteredTodo.in_editing);

      if(todoItem.inEditing === true) {
        TodoList.$todoTable.append(todoItem.form());
      } else {
        TodoList.$todoTable.append(todoItem.html());
      }
    });

    $('#todo-count').text(filteredTodos.length + " " + targetFilter);
  },

  createTodo: function(event) {
    var $form = $(event.currentTarget),
      $name = $form.find("input[name='name']"),
      newTodo;

    event.preventDefault();

    if($name.val() === "") {
      throw error;
    } else {
      newTodo = { todo: { name: $name.val() }};
    }

    $name.val("");

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
  },

  editTodo: function() {
    var todoID = $(event.target).closest('tr').data('id'),
      todoItem = { todo: { id: todoID, in_editing: true }};

    $.ajax({
      url: "/todos/" + todoID,
      type: "PATCH",
      data: todoItem
    })
    .done(this.getTodos.bind(this));
  },

  submitTodoChange: function(event) {
    var todoID = $(event.target).closest('tr').data('id'),
      $name = $(event.target).find("input[name='edit-name']"),
      todoItem = { todo: { id: todoID, name: $name.val(), in_editing: false }};

    event.preventDefault();
    $.ajax({
      url: "/todos/" + todoID,
      type: "PATCH",
      data: todoItem
    })
    .done(this.getTodos.bind(this));
  }
};
