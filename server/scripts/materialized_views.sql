create materialized view category_stats as select pc.id as id, pc.name as cat_name, count(*) from products p left join product_categories pc on category_ident = pc.id  group by pc.id, pc.name;

