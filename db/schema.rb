# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_29_190518) do
  create_table "parking_slots", force: :cascade do |t|
    t.text "distances"
    t.integer "size"
    t.integer "vehicle_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["vehicle_id"], name: "index_parking_slots_on_vehicle_id"
  end

  create_table "vehicles", force: :cascade do |t|
    t.string "reg_number"
    t.integer "size"
    t.datetime "entry_time"
    t.datetime "exit_time"
    t.integer "parking_slot_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parking_slot_id"], name: "index_vehicles_on_parking_slot_id"
  end

  add_foreign_key "parking_slots", "vehicles"
  add_foreign_key "vehicles", "parking_slots"
end
