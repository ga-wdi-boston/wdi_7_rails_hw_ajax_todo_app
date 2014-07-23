class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title
      t.datetime :completedAt
      t.boolean :isComplete, nil: false, default: false

      t.timestamps
    end
  end
end
