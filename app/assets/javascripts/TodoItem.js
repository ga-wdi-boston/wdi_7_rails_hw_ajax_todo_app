var TodoItem = function(name){
  this.id = TodoItem.generateId();
  this.name = name;
  this.createdAt = new Date();
  this.completedAt = null;
};

TodoItem.nextId = 0;
TodoItem.generateId = function(){
  TodoItem.nextId += 1;
  return TodoItem.nextId;
};

TodoItem.prototype = {
  html: function(){
    var row = $('<tr>');
    var nameCell = $('<td>').text(this.name);
    var dateCell = $('<td>').addClass('date').text(this.dateString());
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

  complete: function(){
    this.completedAt = new Date();
  },

  dateString: function(){
    if(this.completedAt){
      return this.formatDate(this.completedAt);
    } else {
      return this.formatDate(this.createdAt);
    }
  },

  formatDate: function(date){
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }
};
