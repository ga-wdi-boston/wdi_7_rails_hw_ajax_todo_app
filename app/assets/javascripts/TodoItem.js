var TodoItem = function(name){
  this.name = name;
  this.createdAt = new Date();
  this.completedAt = null;
};

TodoItem.prototype = {
  html: function(){
    var row = $('<tr>');
    var nameCell = $('<td>').text(this.name);
    var dateCell = $('<td>').addClass('date').text(this.dateString());
    var buttonsCell = $('<td>').addClass('buttons');
    var completeButton = $('<button>').
      text(' Complete').
      attr('type', 'button').
      addClass('btn btn-success').
      prepend($('<span>').addClass('glyphicon glyphicon-ok'));
    var deleteButton = $('<button>').
      attr('type', 'button').
      addClass('btn btn-danger').
      prepend($('<span>').addClass('glyphicon glyphicon-remove'));
    buttonsCell.append(completeButton).append(' ').append(deleteButton);

    return row.append(nameCell).append(dateCell).append(buttonsCell);
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
