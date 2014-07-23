class Drop < ActiveRecord::Migration
  def change
    remove_column :todos, :completedAt
    add_column :todos, :completed_at, :datetime
    add_index :todos, :title
    add_index :todos, :completed_at
  end
end
