class Tasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :task

      t.timestamps
    end
  end
end
