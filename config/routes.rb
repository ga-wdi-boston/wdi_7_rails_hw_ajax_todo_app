Rails.application.routes.draw do
  root 'home#show'
  resources :todos
end
