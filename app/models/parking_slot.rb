class ParkingSlot < ApplicationRecord
  belongs_to :vehicle, optional: true

  serialize :distances, Array, coder: YAML

  validates :size, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, maximum: 2}
  validates :distances, presence: true, length: { minimum: 3 }
end
