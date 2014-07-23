class TodosController < ApplicationController
  respond_to :json

  def index
    respond_with(Todo.all)
  end
end
