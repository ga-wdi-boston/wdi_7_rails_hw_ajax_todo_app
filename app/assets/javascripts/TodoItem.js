var TodoItem = function(attrs){
  attrs = attrs || {};
  this.id = attrs.id;
  this._name = attrs.name;
  this.createdAt = attrs.created_at ? new Date(attrs.created_at) : new Date();
  this.completedAt = attrs.completed_at ? new Date(attrs.completed_at) : null;
};

TodoItem.statuses = ['todo', 'done']; // Values that `status` could return
TodoItem.sortableProperties = ['date', 'name']; // Actually names of functions

TodoItem.prototype = {
  name: function(){
    return this._name;
  },

  date: function(){
    return this.completedAt || this.createdAt;
  },

  rename: function(name){
    this._name = name;
  },

  complete: function(date){
    this.completedAt = date;
  },

  status: function(){
    return this.completedAt ? 'done' : 'todo';
  },

  html: function(){
    return HandlebarsTemplates.todoItem({
      id: this.id,
      name: this._name,
      date: this.date(),
      completed: !!this.completedAt
    });
  },
};
