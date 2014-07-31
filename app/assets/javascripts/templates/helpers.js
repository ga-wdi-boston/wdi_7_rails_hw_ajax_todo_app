Handlebars.registerHelper('panelType', function(status){
  return status === 'done' ? 'success' : 'info';
});

Handlebars.registerHelper('formatDate', function(date){
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
});
