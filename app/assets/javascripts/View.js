var ToDo = ToDo || {};

ToDo.View = function(template){
  this.template = template;

  this.$todoList = $('#todo-list');
  this.$todoCounter = $('#todo-counter');
  this.$todoActiveList = $('#todo-active-list');
  this.$todoActiveCounter = $('#todo-active-counter');
  this.$todoCompletedList = $('#todo-completed-list');
  this.$todoCompletedCounter = $('#todo-completed-counter');
  this.$sortAlpha = $('#sort-alpha');
  this.$sortCreated = $('#sort-created');
  this.$sortCompleted = $('#sort-completed');
  this.$clearCompleted = $('#clear-completed');
  this.$toggleAll = $('#toggle-all');
  this.$newTodo = $('#new-todo');
  this.$updateId = $('#update-id');
  this.$newSubmitBtn = $('#todo-submit');

  // Direct all Enter hits to the form button
  var that = this;
  $(document).keypress(function(event){
    if(event.keyCode === 13) {
      that.$newSubmitBtn.click();
    }
  });
};

ToDo.View.prototype = {
  bind : function(action, handler){
    var that = this;

    if(action === "create") {
      this.$newSubmitBtn.on("click", function(event){
        handler(that.$newTodo.val(), that.$updateId.val());
        event.preventDefault();
      });

    } else if(action === "edit") {
      $('#todo-active-list, #todo-completed-list').on('click', '.edit', function(event){
        handler({id: that._itemId(this)});
        event.preventDefault();
      });

    } else if(action === "delete") {
      $('#todo-active-list, #todo-completed-list').on('click', '.destroy', function(event){
        handler({id: that._itemId(this)});
        event.preventDefault();
      });

    } else if(action === "toggle") {
      $('#todo-active-list, #todo-completed-list').on("click", ".toggle", function(event){
        handler({
          id : that._itemId(this),
          is_complete : this.checked
        });
      });

    } else if(action === 'sortByTitle') {
      this.$sortAlpha.click(function(event){
        handler();
        event.preventDefault();
      });

    } else if(action === 'sortByCreatedAt') {
      this.$sortCreated.click(function(event){
        handler();
        event.preventDefault();
      });

    } else if(action === 'sortByCompletedAt') {
      this.$sortCompleted.click(function(event){
        handler();
        event.preventDefault();
      });
    }
  },

  render : function(command, args){
    var that = this;
    var commands = {
      showActive : function(){
        var activeOnly = true;
        that.$todoActiveList.html(that.template.show(args.data, args.comparator));
        $('#todo-active-list .item-completed').remove();
      },
      showCompleted : function(){
        var activeOnly = false;
        that.$todoCompletedList.html(that.template.show(args.data, args.comparator));
        $('#todo-completed-list .item-created').remove();
      },
      updateCount : function(){
        that.$todoCounter.text(args.total);
        that.$todoActiveCounter.text(args.active);
        that.$todoCompletedCounter.text(args.completed);
      },
      clearForm : function(){
        that.$newTodo.val('');
        that.$updateId.val('');
        that.$newSubmitBtn.text('Create');
      },
      editItem : function(){
        that._editItem(args.id, args.title);
      },
      updateItem : function(){
        that._updateItem(args.id, args.title);
      },
      removeItem : function(){
        that._removeItem(args.id);
      },
      completeItem : function(){
        that._completeItem(args.id, args.is_complete);
      }
    };

    commands[command]();
  },

  _itemId : function(e){
    var $li = $(e).closest("li");
    return $li.data("id");
  },

  _editItem : function(id, title){
    this.$newTodo.val(title);
    this.$updateId.val(id);
    this.$newSubmitBtn.text('Save');

    this.$newTodo.focus();
  },

  _updateItem : function(id, title){
    var $e = $('[data-id="' + id + '"]');
    if(!$e) {
      return;
    }
    $('input .edit').remove();
    $e.removeClass('editing');
    $e.children('label').each(function(i, e){
      e.text(title);
    });
  },

  _removeItem : function(id){
    $('[data-id="' + id + '"]').remove();
  },

  _completeItem : function(id, flag){
    var $e = $('[data-id="' + id + '"]');
    if(!$e) {
      return;
    }
    if(flag) {
      $e.addClass('completed');
    } else {
      $e.removeClass('completed');
    }
  }
};
