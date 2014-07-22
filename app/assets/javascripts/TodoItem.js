var TodoApp = {

  tasks: [],

  initialize: function(){
    $('#task-form').on('submit',$.proxy(this.createTask, this));
    $('#tasks-list').on('click', '#delete-button',$.proxy(this.deleteTask,this));
    $('#tasks-list').on('click', '#done-button',$.proxy(this.doneTask, this));
    $('#finished-list').on('click', '#delete-button',$.proxy(this.deleteTask,this));

  },
  createTask: function(event){
    var task = $('#task-field').val();
    if(task !== ''){
      var newTask = new TodoItem(task);
      this.tasks.push(newTask);
      this.updateTasks();
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
  },

  updateTasks: function(event){
    $('#tasks-list').empty();
    $('#finished-list').empty();

    this.tasks.forEach(function(task){
      if(task.completedAt !== null) {
        $('#finished-list').append(task.html(task));
      } else {
        $('#tasks-list').append(task.html(task));
      }
    });
  }
};
