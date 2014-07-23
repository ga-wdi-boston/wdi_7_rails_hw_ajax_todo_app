var TodoItem = function(id, name, createdAt, completedAt){
  if(!name){ throw { validationError: true }; }
  this.id = id;
  this.name = name;
  this.createdAt = new Date(createdAt);
  if(completedAt !== null) {
    this.completedAt = new Date(completedAt);
  } else {
    this.completedAt = null;
  }
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
      dataName = $('<td>').text(this.name),
      dataTimestamp = "",
      tableRow = $('<tr>');

    if(this.completedAt === null) {
      var iconCompleted = $('<i>').addClass('fi-check');
      var linkCompleted = $('<a>').attr('href', '#').attr('title', 'Complete').append(iconCompleted).text('Complete');
      dataCompleted = $('<td>').append(linkCompleted);
      dataTimestamp = $('<td>').text(this.formatDate(this.createdAt));
    } else {
      dataCompleted = $('<td>');
      dataTimestamp = $('<td>').text(this.formatDate(this.completedAt));
      tableRow.addClass('completed');
    }

    var iconDelete = $('<i>').addClass('fi-x');
    var linkDelete = $('<a>').attr('href', '#').attr('title', 'Delete').append(iconDelete).text('Delete');
    var dataDelete = $('<td>').append(linkDelete);

    // Task table row
    tableRow.append(dataCompleted)
      .append(dataName)
      .append(dataTimestamp)
      .append(dataDelete)
      .data('id', this.id);

    return tableRow;
  }
};
