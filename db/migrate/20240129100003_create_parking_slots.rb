class CreateParkingSlots < ActiveRecord::Migration[7.1]
  def change
    create_table :parking_slots do |t|
      t.text :distances
      t.integer :size
      t.references :vehicle, null: true, foreign_key: true

      t.timestamps
    end
  end
end
