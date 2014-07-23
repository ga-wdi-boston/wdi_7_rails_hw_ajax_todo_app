var ToDo = ToDo || {};

ToDo.Application = {
  init : function(){
    this.template = new ToDo.Template();
    this.storage = new ToDo.RailsApi();
    this.model = new ToDo.Model(this.storage);
    this.view = new ToDo.View(this.template);
    this.controller = new ToDo.Controller(this.model, this.view);
  }
};

$(document).ready(function(){
  ToDo.Application.init();
});
