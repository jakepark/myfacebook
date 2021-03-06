Rails.application.routes.draw do
  # resources :friendships
  root to: 'static_pages#root'

  resource :session, only: [:new]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index, :update, :destroy]
    resources :posts, only: [:create, :show, :update, :destroy, :index]
    resources :comments, only: [:create, :show, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
    resources :friendships
    resources :friends, only: [:index]
  end

  get "/auth/:provider/callback", to: "api/sessions#omniauth"

end
