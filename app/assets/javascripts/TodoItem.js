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

  rename: function(name){
    this._name = name;
  },

  complete: function(){
    this.completedAt = new Date();
  },

  status: function(){
    return this.completedAt ? 'completed' : 'pending';
  },

  html: function(){
    var row = $('<tr>').addClass('todo').data('id', this.id);
    var nameCell = $('<td>').addClass('name');
    var dateCell = $('<td>').addClass('date').text(this.formatDate(this.date()));
    var buttonsCell = $('<td>').addClass('buttons');

    var nameDisplay = $('<span>').
      addClass('name-display').
      text(this._name);
    var nameForm = $('<form>').addClass('name-form');
    var nameInput = $('<input>').hide().
      attr('type', 'text').
      attr('autocomplete', 'off').
      addClass('name-input form-control');
    nameCell.append(nameDisplay).append(nameForm.append(nameInput));

    var mainButtons = $('<span>').addClass('buttons-main');
    var editButtons = $('<span>').addClass('buttons-edit').hide();

    if(!this.completedAt){
      var completeButton = $('<button>').
        text(' Done').
        attr('type', 'button').
        addClass('btn btn-success complete-todo').
        prepend($('<span>').addClass('glyphicon glyphicon-ok'));
      mainButtons.append(completeButton).append(' ');
    }

    var editButton = $('<button>').
      attr('type', 'button').
      addClass('btn btn-warning edit-todo').
      prepend($('<span>').addClass('glyphicon glyphicon-pencil'));
    mainButtons.append(editButton).append(' ');

    var deleteButton = $('<button>').
      attr('type', 'button').
      addClass('btn btn-danger delete-todo').
      prepend($('<span>').addClass('glyphicon glyphicon-remove'));
    mainButtons.append(deleteButton);

    var editSaveButton = $('<button>').
      text('Save').
      attr('type', 'button').
      addClass('btn btn-success update-todo');
    editButtons.append(editSaveButton).append(' ');

    var editCancelButton = $('<button>').
      text('Cancel').
      attr('type', 'button').
      addClass('btn btn-danger cancel-edit-todo');
    editButtons.append(editCancelButton);

    buttonsCell.append(mainButtons).append(editButtons);

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
