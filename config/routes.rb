Rails.application.routes.draw do
  root 'home#index'
  get 'todos/query', to: 'todos#find'
  resources :todos, except: [:new, :edit]
end
