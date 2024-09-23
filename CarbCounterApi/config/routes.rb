Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }, path_names: {
    sign_in: 'login',
    sign_out: 'logout',
  }
  namespace :api do
    resources :meals, only: [:create]
    resources :patients, only: [:show] do
      member do
        get :meals
        get :reports
        get :reports_csv
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
