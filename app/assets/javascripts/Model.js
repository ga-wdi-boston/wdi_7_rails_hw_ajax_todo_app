var Todo = Todo || {};

Todo.Model = function(storage){
  this.storage = storage;
};

Todo.Model.prototype = {
  create : function(title, callback){
    callback = callback || function(){};
    var data = {title: title};
    this.storage.saveOrUpdate(data, callback);
  },

  read : function(query, callback){
    callback = callback || function(){};
    if(query) {
      return this.storage.find(query, callback);
    } else {
      return this.storage.findAll(callback);
    }
  },

  update : function(id, data, callback){
    this.storage.saveOrUpdate(data, callback, id);
  },

  delete : function(id){
    this.storage.remove(id);
  },

  getCount : function(callback){
    var status = {
      active : 0,
      completed : 0,
      total : 0
    };

    this.storage.findAll(function(data){
      data.forEach(function(item){
        if(item.is_completed) {
          status.completed += 1;
        } else {
          status.active += 1;
        }
        status.total += 1;
      });
      callback(status);
    });
  }
};
