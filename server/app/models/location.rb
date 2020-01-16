class Location < ApplicationRecord
    has_many :sales, dependent: :destroy
end
