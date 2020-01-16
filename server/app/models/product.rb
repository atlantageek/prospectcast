class Product < ApplicationRecord
    has_many :sales, dependent: :destroy
end
