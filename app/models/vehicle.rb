class Vehicle < ApplicationRecord
  belongs_to :parking_slot, optional: true

  validates :reg_number, presence: true
  validates :size, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :entry_time, presence: true
end
