class AddUniqueIndexToTodoName < ActiveRecord::Migration
  def change
    add_index :todos, :name, unique: true
  end
end
