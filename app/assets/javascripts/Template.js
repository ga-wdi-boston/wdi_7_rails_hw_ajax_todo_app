var Todo = Todo || {};

Todo.Template = function(){
  this.listTemplate =
  '<li data-id="%id%" class="td-item">' +
    '<div class="td-item-body-container">' +
      '<div class="td-item-body">' +
        '<div class="%completed% td-item-title">%title%</div>' +
        '<div class="td-item-meta">Created: %createdAt%</div>' +
        '<div id="item-completed" class="td-item-meta">Completed: %completedAt%</div>' +
      '</div>' +
    '</div>' +
    '<div class="td-item-control-container">' +
      '<div class="td-item-control">' +
        '<input type="checkbox" class="toggle" %checked%>' +
        '<span class="">Complete</span>' +
      '</div>'  +
      '<button class="destroy td-item-control">Delete</button>' +
    '</div>' +
  '</li>';
};

Todo.Template.prototype = {
  show : function(data, comparator){
    data = data || [];
    comparator = comparator || this.Controller._idComparator;
    var view = '';

    data.sort(comparator);
    for(var i = 0; i < data.length; i++) {
      var template = this.listTemplate,
        completed = '',
        checked = '',
        completedAt = '';

      if(data[i].is_completed) {
        completed = 'completed';
        checked = 'checked';
        completedAt = data[i].completed_at.toLocaleString();
      }
      template = template.replace('%id%', data[i].id);
      template = template.replace('%completed%', completed);
      template = template.replace('%title%', data[i].title);
      template = template.replace('%createdAt%', data[i].created_at.toLocaleString());
      template = template.replace('%completedAt%', completedAt);
      template = template.replace('%checked%', checked);

      view = view + template;
    }
    return view;
  },
};
