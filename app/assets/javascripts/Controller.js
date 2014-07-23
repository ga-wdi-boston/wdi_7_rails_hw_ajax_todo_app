var Todo = Todo || {};

Todo.Controller = function(model, view){
  this.model = model;
  this.view = view;
  this.sortComparator = 'id';

  // Bind actions to initial DOM elements
  var that = this;
  this.view.bind('create', function(title){
    that.create(title);
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

Todo.Controller.prototype = {
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

  create : function(title){
    if(title.trim() === '') {
      return;
    }
    var that = this;
    var todo = this.model.create(title, function(){
      that.view.render('clearForm');
      that.refresh();
    });
  },

  read : function(id){
    var item = this.model.read({id : id});
    this.view.render('editItem', item);
  },

  update : function(id, title){
    if(title.trim()) {
      this.model.update(id, title);
    } else {
      this.model.delete(id);
    }
  },

  delete : function(id){
    this.model.delete(id);
    this.refresh();
  },

  deleteCompleted : function(){
    var that = this;
    var items = this.model.read({is_completed : true});
    items.forEach(function(item){
      that.delete(item.id);
    });
  },

  toggle : function(id, flag){
    var data = {
      is_completed : flag,
      completed_at : new Date()
    };
    var that = this;
    this.model.update(id, data, function(){
      that.view.render('itemComplete', {id: id, is_completed: flag});
      that.refresh();
    });
  },

  //---------- Rendering Methods ----------//

  refresh : function(){
    this._updateCount();
    this.show();
  },

  show : function(){
    this.showActive();
    this.showCompleted();

    var that = this;
    this.view.bind('toggle', function(item){
      that.toggle(item.id, item.is_completed);
    });
    this.view.bind('delete', function(item){
      that.delete(item.id);
    });
  },

  showActive : function(){
    var that = this;
    this.model.read({is_completed : false}, function(data){
      var args = {
        data : data,
        comparator : that._getComparator()
      };
      that.view.render('showActive', args);
    });
  },

  showCompleted : function(){
    var that = this;
    this.model.read({is_completed : true}, function(data){
      var args = {
        data : data,
        comparator : that._getComparator()
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
