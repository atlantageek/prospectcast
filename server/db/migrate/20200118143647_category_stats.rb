class CategoryStats < ActiveRecord::Migration[6.0]
  def change
    reversible do |dir|
      dir.up do
        execute "create materialized view category_stats as select pc.id as id, pc.name as cat_name, count(*) from products p left join product_categories pc on category_ident = pc.id  group by pc.id, pc.name;" 
      end
      dir.down do
        execute "drop materialized view category_stats;"
      end
    end
  end
end
