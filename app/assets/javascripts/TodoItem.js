var TodoItem = function(id, name, createdAt, completedAt, inEditing){
  if(!name){ throw { validationError: true }; }
  this.id = id;
  this.name = name;
  this.createdAt = new Date(createdAt);
  if(completedAt !== null) {
    this.completedAt = new Date(completedAt);
  } else {
    this.completedAt = null;
  }
  this.inEditing = inEditing || false;
};

TodoItem.prototype = {
  formatDate: function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if(minutes < 10){
      minutes = "0" + minutes;
    }
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    var time = hours + ":" + minutes + ":" + seconds;
    return month + "/" + day + "/" + year + " " + time;
  },

  html: function() {
    var dataCompleted = "",
      dataName = $('<td>').text(this.name).addClass('todo-name'),
      dataTimestamp = "",
      tableRow = $('<tr>');

    if(this.completedAt === null) {
      var iconCompleted = $('<i>').addClass('fi-check');
      var linkCompleted = $('<a>').attr('href', '#').attr('title', 'Complete').append(iconCompleted);
      dataCompleted = $('<td>').append(linkCompleted);
      dataTimestamp = $('<td>').text(this.formatDate(this.createdAt));
    } else {
      dataCompleted = $('<td>');
      dataTimestamp = $('<td>').text(this.formatDate(this.completedAt));
      tableRow.addClass('completed');
    }

    var iconDelete = $('<i>').addClass('fi-x');
    var linkDelete = $('<a>').attr('href', '#').attr('title', 'Delete').append(iconDelete);
    var dataDelete = $('<td>').append(linkDelete);

    tableRow.append(dataCompleted)
      .append(dataName)
      .append(dataTimestamp)
      .append(dataDelete)
      .data('id', this.id);

    return tableRow;
  },

  form: function() {
    var $tr = $('<tr>').attr('id', 'edit-todo-form'),
      $td = $('<td>'),
      $form = $('<form>'),
      $input = $('<input>').attr('type', 'text').attr('name','edit-name').attr('placeholder', this.name).attr('id', 'edit-todo-name'),
      $submit = $('<button>').attr('type', 'submit'),
      dataCompleted = $('<td>');

    $form.append($input).append($submit);
    $td.append($form);
    $tr.append(dataCompleted)
      .append($td)
      .data('id', this.id);

    return $tr;
  }
};
