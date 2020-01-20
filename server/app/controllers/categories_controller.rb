class CategoriesController < ApplicationController
    #before_action :set_product, only: [:show, :update, :destroy]
  
  
  # GET /categories
  def index
    @categories = CategoryStat.all

    render json: @categories
  end
end