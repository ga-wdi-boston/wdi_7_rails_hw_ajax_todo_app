var ToDo = ToDo || {};

ToDo.RailsApi = function(){
  this.url = "http://localhost:3000/todos";
};

ToDo.RailsApi.prototype = {
  saveOrUpdate : function(data, callback, id){
    callback = callback || function(){};
    var url = this.url,
      type = "POST",
      that = this;

    // Set url and method for updates
    if(id) {
      url = url + "/" + id;
      type = "PATCH";
    }

    $.ajax({
      url : url,
      type : type,
      data : {todo : data},
      dataType : "json"
    })
    .done(function(data){
      callback.call(that, data);
    });
  },

  find : function(query, callback){
    callback = callback || function(){};
    var that = this;
    $.ajax({
      url : this.url + "/query",
      type : "GET",
      data : {todo: query},
      dataType : "json"
    })
    .done(function(data){
      callback.call(that, data);
    });
  },

  findAll : function(callback){
    callback = callback || function(){};
    var that = this;
    $.ajax({
      url : this.url,
      type : "GET",
      dataType : "json"
    })
    .done(function(data){
      callback.call(that, data);
    });
  },

  remove : function(id){
    var that = this;
    $.ajax({
      url : this.url + "/" + id,
      type : "DELETE",
      dataType : "json"
    })
    .done(function(data){
      //TODO
    });
  }
};
