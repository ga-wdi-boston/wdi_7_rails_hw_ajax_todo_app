var ToDo = ToDo || {};

ToDo.Controller = function(model, view){
  this.model = model;
  this.view = view;
  this.sortComparator = 'id';

  // Bind actions to initial DOM elements
  var that = this;
  this.view.bind('create', function(title, id){
    that.create(title, id);
  });
  this.view.bind('sortByTitle', function(){
    that.sortComparator = 'title';
    that.refresh();
  });
  this.view.bind('sortByCreatedAt', function(){
    that.sortComparator = 'createdAt';
    that.refresh();
  });
  this.view.bind('sortByCompletedAt', function(){
    that.sortComparator = 'completedAt';
    that.refresh();
  });

  // Render the initial page
  this.refresh();
};

ToDo.Controller.prototype = {
  getComparator : function(){
    if(this.sortComparator === 'title') {
      return this._titleComparator;
    } else if(this.sortComparator === 'createdAt') {
      return this._createdAtComparator;
    } else if(this.sortComparator === 'completedAt') {
      return this._completedAtComparator;
    }
    return this._idComparator;
  },

  //---------- Action Methods ----------//

  create : function(title, id){
    if(title.trim() === '') {
      return;
    }
    if(id.trim()) {
      return this.update(id, title);
    }
    this.model.create(title);
    this.view.render('clearForm');
    this.refresh();
  },

  read : function(id){
    var that = this;
    this.model.read({id : id}, function(data){
      that.view.render('editItem', data[0]);
    });
  },

  update : function(id, title){
    if(title.trim()) {
      this.model.update(id, {title: title});
      this.view.render('clearForm');
    } else {
      this.model.delete(id);
    }
    this.refresh();
  },

  delete : function(id){
    this.model.delete(id);
    this.refresh();
  },

  deleteCompleted : function(){
    var that = this;
    var items = this.model.read({is_complete : true});
    items.forEach(function(item){
      that.delete(item.id);
    });
  },

  toggle : function(id, flag){
    var data = {
      is_complete : flag,
      completed_at : new Date()
    };
    var that = this;
    this.model.update(id, data, function(){
      that.view.render('completeItem', {id: id, is_complete: flag});
      that.refresh();
    });
  },

  //---------- Rendering Methods ----------//

  refresh : function(){
    this.updateCount();
    this.show();
  },

  show : function(){
    this.showActive();
    this.showCompleted();

    var that = this;
    this.view.bind('toggle', function(item){
      that.toggle(item.id, item.is_complete);
    });
    this.view.bind('delete', function(item){
      that.delete(item.id);
    });
    this.view.bind('edit', function(item){
      that.read(item.id);
    });
  },

  showActive : function(){
    var that = this;
    this.model.read({is_complete : false}, function(data){
      var args = {
        data : data,
        comparator : that.getComparator()
      };
      that.view.render('showActive', args);
    });
  },

  showCompleted : function(){
    var that = this;
    this.model.read({is_complete : true}, function(data){
      var args = {
        data : data,
        comparator : that.getComparator()
      };
      that.view.render('showCompleted', args);
    });
  },

  updateCount : function(){
    var that = this;
    this.model.getCount(function(status){
      that.view.render('updateCount', status);
    });
  },

  //---------- Comparators ----------//

  _idComparator : function(a, b){
    return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
  },

  _titleComparator : function(a, b){
    return a.title < b.title ? -1 : (a.title > b.title ? 1 : 0);
  },

  _createdAtComparator : function(a, b){
    return a.created_at < b.created_at ? -1 : (a.created_at > b.created_at ? 1 : 0);
  },

  _completedAtComparator : function(a, b){
    return a.completed_at < b.completed_at ? -1 : (a.completed_at > b.completed_at ? 1 : 0);
  }
};
