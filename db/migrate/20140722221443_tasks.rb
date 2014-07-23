class Tasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :task
      t.datetime :completed_at

      t.timestamps
    end
  end
end
