class TodosController < ApplicationController
  def default_serializer_options
    { root: false }
  end

  respond_to :json

  def index
    todos = Todo.all.order('created_at')
    respond_with(todos)
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

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    respond_with(todo)
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :completed_at, :in_editing)
  end
end
