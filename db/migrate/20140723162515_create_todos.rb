class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.text :name
      t.timestamps
      t.datetime :completed_at
    end
  end
end
