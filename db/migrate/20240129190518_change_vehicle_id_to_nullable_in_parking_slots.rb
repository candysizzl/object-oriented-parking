class ChangeVehicleIdToNullableInParkingSlots < ActiveRecord::Migration[7.1]
  def change
    change_column :parking_slots, :vehicle_id, :integer, null: true
  end
end
