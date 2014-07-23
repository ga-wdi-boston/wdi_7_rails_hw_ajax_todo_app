class ChangeIsCompletedOnTodos < ActiveRecord::Migration
  def change
    remove_column :todos, :isComplete
    add_column :todos, :is_complete, :boolean, null: false, default: false
    add_index :todos, :is_complete
  end
end
