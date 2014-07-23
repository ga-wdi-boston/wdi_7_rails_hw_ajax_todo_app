var TodoList = {
  initialize: function(todoFormID, todoTableID) {
    this.$todoForm = $(todoFormID);
    this.$todoTable = $(todoTableID);

    this.$todoForm.submit(this.createTodo.bind(this));
    this.$todoTable.on('click',"a[title='Delete']", this.deleteTodo.bind(this));
    this.$todoTable.on('click',"a[title='Complete']", this.completeTodo.bind(this));
  },

  getTodos: function() {
    $.ajax({
      url: "http://localhost:3000/todos",
    })
    .done(this.showTodoList.bind(this));
  },

  showTodoList: function(todos) {
    var todoHTML = "",
      todoItem;

    this.$todoTable.empty();

    todos.forEach(function(todo){
      todoItem = new TodoItem(todo.id, todo.name, todo.created_at, todo.completed_at);
      TodoList.$todoTable.append(todoItem.html());
    });
  },

  createTodo: function(event) {
    var $form = $(event.target),
      $name = $form.find("input[name='name']"),
      newTodo = { todo: { name: $name.val() }};

    $name.val("");

    event.preventDefault();
    $.ajax({
      url: "http://localhost:3000/todos",
      type: "POST",
      data: newTodo
    })
    .done(this.addTodoToList.bind(this));
  },

  addTodoToList: function(todo) {
    var newTodo = new TodoItem(todo.id, todo.name, todo.created_at, null),
      todoHTML = newTodo.html();
    this.$todoTable.append(todoHTML);
  },

  deleteTodo: function(event) {
    var todoID = $(event.target).closest('tr').data('id');
      todoItem = { todo: { id: todoID }};

    event.preventDefault();
    $.ajax({
      url: "http://localhost:3000/todos/" + todoID,
      type: "DELETE",
      data: todoItem
    })
    .done(this.getTodos.bind(this));
  },

  completeTodo: function(event) {
    var todoID = $(event.target).closest('tr').data('id');
      todoItem = { todo: { id: todoID, completed_at: new Date() }};

    event.preventDefault();
    $.ajax({
      url: "http://localhost:3000/todos/" + todoID,
      type: "PATCH",
      data: todoItem
    })
    .done(this.getTodos.bind(this));
  }
};
