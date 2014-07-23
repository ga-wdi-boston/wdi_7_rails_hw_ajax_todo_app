var TodoApp = {

  tasks: [],

  initialize: function(){
    $('#task-form').on('submit',$.proxy(this.createTask, this));
    $('#tasks-list').on('click', '#delete-button',$.proxy(this.deleteTask,this));
    $('#tasks-list').on('click', '#done-button',$.proxy(this.doneTask, this));
    $('#finished-list').on('click', '#delete-button',$.proxy(this.deleteTask,this));
    TodoApp.getTasks();

  },

  updateTasks: function(tasks){
      $('#tasks-list').empty();
      $('#finished-list').empty();

    var newTask;

    tasks.forEach(function(task){
      newTask = new TodoItem(task.id, task.task, task.completed_at);
      if(task.completed_at !== null) {
        $('#finished-list').append(newTask.html(task));
      } else {
        $('#tasks-list').append(newTask.html(task));
      }
    });
  },

  getTasks: function(){
    //alert("Go off to the backend and get all the articles");

    this.count = 0;

    // fires off a HTTP GET to the backend
    $.ajax({
      url: 'http://localhost:3000/tasks',
      dataType: 'json'
      // On the reply from the Rails API server
      // invoked the method articlesCallbackHandler
      //success: this.articlesCallbackHandler.bind(this)
    })
    .done(this.updateTasks.bind(this));
  },
  addTaskToList: function(task){
    var newTask = new Task(task.id, task.task);
    if(task.completed_at !== null) {
      $('#finished-list').append(newTask.html(task));
    } else {
      $('#tasks-list').append(newTask.html(task));
    }
    this.count = this.count + 1;
  },
  createTask: function(event){
    var input = $('#task-field').val();
    if(input !== ''){
      requestObj = {task:  {task: input}};
      //this.tasks.push(newTask);
      $.ajax({
        type: "POST",
        url: 'http://localhost:3000/tasks',
        data: requestObj,
        dataType: 'json'
      })
    .done(this.addTasksToList.bind(this));
      $('#task-field').val('');
    }
    event.preventDefault();
  },

  deleteTask: function(event){
    task = this.getTask(event);
    this.tasks = this.tasks.filter(function(obj) {return obj.id !== task.id;});
    this.updateTasks();
    event.preventDefault();
  },

  doneTask: function(event){
    task = this.getTask(event);
    task.markCompleted();
    this.updateTasks();
    event.preventDefault();
  },

  getTask: function(event){
    id = $(event.target).parent().data('id');
    return $.grep(this.tasks,function(task){return task.id === id})[0];
  }
};
