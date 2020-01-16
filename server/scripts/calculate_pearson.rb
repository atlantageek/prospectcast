sql = "select distinct product_id, min(dt) as start_dt from sales group by product_id"
results = ActiveRecord::Base.connection.execute(sql)
results.each do |row|
  sql2=ActiveRecord::Base.send(:sanitize_sql_array, ["select dt,sum(count) as cnt, DATE_PART('day',dt - ?) as day_idx from sales where  product_id=? group by dt, day_idx order by dt",row['start_dt'], row['product_id']])
  result2 = ActiveRecord::Base.connection.execute(sql2)
  result2.each do |row2|
   # print row2['cnt'],",", row2['day_idx'], row2['dt'],",",row['start_dt'],",",row['product_id'],"\n"
    sales[row2['day_idx']] = row[2['cnt']]
  end
  puts "---------------------"
end