class TodosController < ApplicationController
  respond_to :json

  def index
    respond_with(Todo.all)
  end

  def create
    todo = Todo.new(todo_params)
    todo.save
    respond_with(todo)
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(todo_params)
    respond_with(todo)
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :completed_at)
  end
end
