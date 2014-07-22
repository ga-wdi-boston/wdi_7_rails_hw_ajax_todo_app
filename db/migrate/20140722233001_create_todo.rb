class CreateTodo < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.text :name, null: false
      t.boolean :is_complete

      t.timestamps
    end
  end
end
