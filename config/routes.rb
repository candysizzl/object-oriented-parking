Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :parking, only: [] do
    collection do
      post '/park', to: 'parking#park'
      post '/unpark', to: 'parking#unpark'
      post '/add-parking-slots', to: 'parking#add_parking_slots'
      post '/reset-parking-lot', to: 'parking#reset_parking_lot'
      get '/view-parking-lot', to: 'parking#view_parking_lot'
      post '/free-parking-space', to: 'parking#free_parking_space'
    end
  end
end
