class TodosController < ApplicationController
  respond_to :json

  def index
    @todos = Todo.all
    respond_with @todos
  end

  def show
    @todo = Todo.find(params[:id])
    respond_with @todo
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      respond_with @todo
    else
      respond_with @todo.errors
    end
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update(todo_params)
      respond_with @todo
    else
      respond_with@todo.errors
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:id, :title, :completed_at, :is_completed)
  end
end
