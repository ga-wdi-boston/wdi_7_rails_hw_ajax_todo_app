var TodoItem = function(id, name, createdAt, completedAt){
  if(!name){ throw { validationError: true }; }
  this.id = id;
  this.name = name;
  this.createdAt = new Date(createdAt);
  this.completedAt = null;
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
    // Task table data
    var dataName = $('<td>').text(this.name),
      dataTimestamp = "",
      tableRow;

    // Created at table data
    if(this.completedAt === null) {
      dataTimestamp = $('<td>').text(this.formatDate(this.createdAt));
    } else {
      dataTimestamp = $('<td>').text(this.formatDate(this.completedAt));
    }

    // Delete table data
    var iconDelete = $('<i>').addClass('fi-x');
    var linkDelete = $('<a>').attr('href', '#').attr('title', 'Delete').append(iconDelete).text('Delete');
    var dataDelete = $('<td>').append(linkDelete);

    // Task table row
    tableRow = $('<tr>').append(dataName)
      .append(dataTimestamp)
      .append(dataDelete)
      .data('id', this.id);

    return tableRow;
  }
};
