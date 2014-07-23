class CreateTodo < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.text :name, null: false
      t.datetime :completed_at

      t.timestamps
    end
  end
end
