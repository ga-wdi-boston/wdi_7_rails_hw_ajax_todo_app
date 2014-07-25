var TodoItem = function(id, name, createdAt, completedAt, inEditing){
  if(!name){ throw { validationError: true }; }
  this.id = id;
  this.name = name;
  this.createdAt = new Date(createdAt);
  if(completedAt !== null) {
    this.completedAt = new Date(completedAt);
  } else {
    this.completedAt = null;
  }
  this.inEditing = inEditing || false;
};
