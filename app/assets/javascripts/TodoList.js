var TodoList = {
  initialize: function(todoFormID, todoTableID) {
    this.$todoForm = $(todoFormID);
    this.$todoTable = $(todoTableID);

    this.$todoForm.submit(this.createTodo.bind(this));
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
      data: newTodo,
    })
    .done(this.addTodoToList.bind(this));
  },

  addTodoToList: function(todo) {
    var newTodo = new TodoItem(todo.id, todo.name, todo.created_at, null),
      todoHTML = newTodo.html();
    this.$todoTable.append(todoHTML);
  }
};
