Rails.application.routes.draw do
  root 'home#index'
  resources :tasks, except: [:new, :edit]
end
