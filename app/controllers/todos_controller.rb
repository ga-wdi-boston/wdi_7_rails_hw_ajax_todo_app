class TodosController < ApplicationController
  def default_serializer_options
    {root: false}
  end

  respond_to :json

  def index
    find_all
    respond_with @todos
  end

  def show
    @todo = Todo.find(params[:id])
    respond_with @todo
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      respond_with Todo.all
    else
      respond_with @todo.errors
    end
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update(todo_params)
      find_all
      respond_with Todo.all
    else
      respond_with @todo.errors
    end
  end

  def destroy
    todo = Todo.find(params[:id]);
    todo.destroy!
    findAll
    respond_with @todos
  end

  def find
    puts params
    @todos = Todo.where(todo_params)
    respond_with @todos
  end

  private

  def find_all
    @todos = Todo.all
  end

  def todo_params
    params.require(:todo).permit(:id, :title, :completed_at, :is_complete)
  end
end
