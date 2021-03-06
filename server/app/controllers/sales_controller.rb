class SalesController < ApplicationController
  before_action :set_sale, only: [:show, :update, :destroy]

  # GET /sales
  def index
    
    product_id = params[:product_id]
    @product = Product.find(product_id)
    @sales = @product.sales.group('dt').select("sum(count) as count,dt").order("dt").limit(10000)

    render json: @sales
  end
  def index2
    
    product_id = params[:product_id]
    @product = Product.find(product_id)
    @sales = @product.sales

    render json: @sales
  end
  # GET /sales/1
  def show
    render json: @sale
  end

  # POST /sales
  def create
    @sale = Sale.new(sale_params)

    if @sale.save
      render json: @sale, status: :created, location: @sale
    else
      render json: @sale.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /sales/1
  def update
    if @sale.update(sale_params)
      render json: @sale
    else
      render json: @sale.errors, status: :unprocessable_entity
    end
  end

  # DELETE /sales/1
  def destroy
    @sale.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sale
      @sale = Sale.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def sale_params
      params.require(:sale).permit(:dt, :location_id, :product_id, :price_cents, :count)
    end
end
