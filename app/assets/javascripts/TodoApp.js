var TodoItem = function(task){
    if(task !== ''){
      // add created date.
    this.id = TodoItem.generateId();
    this.task = task;
    this.completedAt = null;
    this.createdAt = Date();
    }
  };

  TodoItem.nextId = 0;
  TodoItem.generateId = function(){
    TodoItem.nextId += 1;
    return TodoItem.nextId;
  };

  TodoItem.prototype = {
    markCompleted: function() {
      this.completedAt = Date();
      return this;
    },
    html: function(task){
      var doneButton = '<button type="button" class="btn btn-success btn-sm" id = "done-button">Done</button>';
      var deleteButton = '<button type="button" class="btn btn-danger btn-sm" id = "delete-button">Delete</button>';
      if (task.completed_at === null){
        list = $('<li>').text(task.task).append(doneButton,deleteButton).attr('data-id',task.id);
      } else {
        list = $('<li>').text(task.task).append(deleteButton).attr('data-id',task.id);
      }
      return list;
    }
  };


