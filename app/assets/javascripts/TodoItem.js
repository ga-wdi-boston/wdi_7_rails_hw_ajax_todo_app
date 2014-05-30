var TodoItem = function(name){
  if(!name){ throw { validationError: true }; }
  this.id = TodoItem.generateId();
  this._name = name;
  this.createdAt = new Date();
  this.completedAt = null;
};

TodoItem.nextId = 0;
TodoItem.generateId = function(){
  TodoItem.nextId += 1;
  return TodoItem.nextId;
};

TodoItem.prototype = {
  name: function(){
    return this._name;
  },

  date: function(){
    return this.completedAt || this.createdAt;
  },

  complete: function(){
    this.completedAt = new Date();
  },

  status: function(){
    return this.completedAt ? 'completed' : 'pending';
  },

  html: function(){
    var row = $('<tr>');
    var nameCell = $('<td>').text(this._name);
    var dateCell = $('<td>').addClass('date').text(this.formatDate(this.date()));
    var buttonsCell = $('<td>').addClass('buttons');
    if(!this.completedAt){
      var completeButton = $('<button>').
        text(' Complete').
        data('id', this.id).
        attr('type', 'button').
        addClass('btn btn-success complete-todo').
        prepend($('<span>').addClass('glyphicon glyphicon-ok'));
      buttonsCell.append(completeButton).append(' ');
    }
    var deleteButton = $('<button>').
      data('id', this.id).
      attr('type', 'button').
      addClass('btn btn-danger delete-todo').
      prepend($('<span>').addClass('glyphicon glyphicon-remove'));
    buttonsCell.append(deleteButton);

    return row.append(nameCell).append(dateCell).append(buttonsCell);
  },

  formatDate: function(date){
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }
};
