Rails.application.routes.draw do
  root 'home_page#action'
  resource :session, only: [:create, :destroy, :new]
  resource :user, only: [:new, :create, :show]

  namespace :api, defaults: {format: :json} do
    resources :listings
    resources :reservations
    resource :user
    resource :picture, only: [:show, :create]
  end
end
