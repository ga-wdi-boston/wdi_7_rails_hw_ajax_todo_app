Handlebars.registerHelper('formatDate', function(dateString) {
  var date = new Date(dateString);
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
});
