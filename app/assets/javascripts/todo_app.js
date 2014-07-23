var Todo = Todo || {};

Todo.Application = {
  init : function(){
    this.template = new Todo.Template();
    this.storage = new Todo.RailsStorage();
    this.model = new Todo.Model(this.storage);
    this.view = new Todo.View(this.template);
    this.controller = new Todo.Controller(this.model, this.view);
  }
};
