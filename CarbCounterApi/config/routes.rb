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

    post 'supervisors/:id/patients', to: 'supervisors#add_patient'
    get 'supervisors/:id/patients', to: 'supervisors#get_patients'
    post 'professionals/:id/patients', to: 'professionals#add_patient'
    get 'professionals/:id/patients', to: 'professionals#get_patients'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
