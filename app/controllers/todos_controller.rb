class TodosController < ApplicationController
  def default_serializer_options
    { root: false }
  end

  respond_to :json

  def index
    @todos = Todo.all.order('created_at')
    respond_with(@todos)
  end

  def show
    @todo = Todo.find(params[:id])
    respond_with(@todo)
  end

  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      respond_with(@todo)
    else
      respond_with(@todo.errors)
    end
  end

  def update
    @todo = Todo.find(params[:id])

    if @todo.update(todo_params)
      respond_with(@todo)
    else
      respond_with(@todo.errors)
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    respond_with(@todos)
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :completed_at, :in_editing)
  end
end
