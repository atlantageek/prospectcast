class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  # GET /products
  def index
    @products = Product.all

    render json: @products
  end

  # GET /products/1
  def show
    render json: @product
  end
  # GET /products_by_category/1
  def products_by_category()
    category_id = params["category_id"]
    products=Product.where(category_ident: category_id)
    render json: products
  end

  def product_stats_by_category()
    category_id = params["category_id"]
    result = Product.left_outer_joins(:sales).where(category_ident: category_id.to_i).select("products.id as id,max(dt) as maxdt, min(dt) as mindt, products.name as name, count(distinct location_id), sum(count)/ (DATE_PART('day', max(dt) - min(dt)) + 1) as daily_sales").group('products.id', 'products.name')
    render json: result
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def product_params
      params.require(:product).permit(:name)
    end
end
