class CreateSales < ActiveRecord::Migration[6.0]
  def change
    create_table :sales do |t|
      t.datetime :dt
      t.integer :location_id
      t.integer :product_id
      t.integer :price_cents
      t.integer :count

      t.timestamps
    end
  end
end
