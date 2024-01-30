class CreateVehicles < ActiveRecord::Migration[7.1]
  def change
    create_table :vehicles do |t|
      t.string :reg_number
      t.integer :size
      t.datetime :entry_time
      t.datetime :exit_time
      t.references :parking_slot, null: true, foreign_key: true

      t.timestamps
    end
  end
end
