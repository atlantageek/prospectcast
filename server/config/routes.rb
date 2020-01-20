Rails.application.routes.draw do
  scope '/api/v1' do
    resources :products do
      resources :sales
    end
    resources :locations
    resources :categories
    get 'products_by_category/:category_id', to: 'products#product_stats_by_category'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
