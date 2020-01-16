class CategoriesController < ApplicationController
    #before_action :set_product, only: [:show, :update, :destroy]
  
  
  # GET /categories
  def index
    @categories = ProductCategory.all

    render json: @categories
  end
end