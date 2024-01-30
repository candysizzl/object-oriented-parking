class ParkingController < ApplicationController
    protect_from_forgery with: :null_session

    before_action :validate_park_params, only: [:park]
    before_action :validate_unpark_params, only: [:unpark]
    before_action :validate_add_slots_params, only: [:add_parking_slots]

    def add_parking_slots
      number_of_entry_points = params[:number_of_entry_points].to_i
      map_data = params[:map_data]

      map_data.each do |slot_size, distances_list|
        distances_list.each do |distances|
          if distances.size != number_of_entry_points
            render json: { success: false, message: 'Distance not provided for all entry points in following slot: #{}' }
            return
          end
          parking_slot = ParkingSlot.create(
            distances: distances,
            size: slot_size,
            vehicle: nil,
          )
        end
      end
  
      render json: { success: true, message: 'Parking lot setup successfully.' }
    end

    def reset_parking_lot
      Vehicle.destroy_all
      ParkingSlot.destroy_all
  
      render json: { success: true, message: 'Parking lot reset successfully.' }
    end

    def free_parking_space
      Vehicle.update_all(exit_time: Time.now)
      ParkingSlot.update_all(vehicle_id: nil)

      render json: { success: true, message: 'All vehicles cleared and parking space freed.' }
    end

    def view_parking_lot
      parking_slots = ParkingSlot.all.includes(:vehicle)

      parking_lot_state = parking_slots.map do |slot|
        {
          distances: slot.id,
          size: slot.size,
          distances: slot.distances,
          status: slot.vehicle.nil? ? 'empty' : 'parked',
          vehicle: slot.vehicle&.attributes&.slice('reg_number')
        }
      end
      render json: { success: true, parking_lot_state: parking_lot_state }
    end

    def park
      size = params[:size].to_i
      reg_number = params[:reg_number]
      entry_point = params[:entry_point].to_i
  
      available_slots = ParkingSlot.where('size >= ? AND vehicle_id IS NULL', size)
  
      if available_slots.any?
        allocated_slot = find_nearest_slot(available_slots, entry_point)

        vehicle = Vehicle.find_by(reg_number: reg_number)

        if vehicle
          if vehicle.exit_time.nil?
            render json: { success: false, message: 'Vehicle with this registeration number is already parked.' }
            return 
          end

          if (Time.now - vehicle.exit_time) < 1.hour
            entry_time = vehicle.entry_time
          else
            entry_time = Time.now
          end

          vehicle.update(
            size: size,
            entry_time: entry_time,
            exit_time: nil
          )
        else
          vehicle = Vehicle.new(
            reg_number: params[:reg_number],
            size: size,
            entry_time: Time.now,
            exit_time: nil,
            parking_slot_id: allocated_slot.id
          )
        end
  
        slot = available_slots.find(allocated_slot.id)
        slot.update(vehicle: vehicle)

        if vehicle.save
        else
          # Handle validation errors
          puts "Vehicle not saved"
          puts vehicle.errors.full_messages
        end
          
        render json: { success: true, message: "Vehicle parked successfully. Slot Position: #{allocated_slot.distances}" }
      else
        render json: { success: false, message: 'No available parking slot for the given size.' }
      end
    end
    
    def find_nearest_slot(slots, entry_point)
      raise 'Invalid entry point.' unless entry_point.between?(0, slots.first.distances.size - 1)
    
      nearest_slot = nil
      min_distance_at_entry_point = Float::INFINITY
    
      slots.each do |slot|
        distance_at_entry_point = slot.distances[entry_point]
    
        if distance_at_entry_point < min_distance_at_entry_point
          min_distance_at_entry_point = distance_at_entry_point
          nearest_slot = slot
        end
      end
    
      nearest_slot
    end

    def unpark
      reg_number = params[:reg_number]
    
      vehicle = Vehicle.find_by(reg_number: reg_number)
    
      if vehicle
        parking_slot = ParkingSlot.find(vehicle.parking_slot_id)
    
        fee = calculate_fee(vehicle, parking_slot.size)
    
        parking_slot.update(vehicle: nil)
        vehicle.update(exit_time: Time.now)
    
        render json: { success: true, message: "Vehicle unparked successfully. Parking Fee: #{fee}" }
      else
        render json: { success: false, message: "Vehicle with registration number #{reg_number} not found." }
      end
    end

    def calculate_fee(vehicle, parking_slot_size)
      flat_rate = 40
      exceeding_rate_sp = 20
      exceeding_rate_mp = 60
      exceeding_rate_lp = 100
    
      hours_parked = ((Time.now - vehicle.entry_time) / 3600).ceil
    
      if hours_parked <= 3
        fee = flat_rate
      else
        case parking_slot_size
        when 0
          fee = flat_rate + ((hours_parked - 3) * exceeding_rate_sp)
        when 1
          fee = flat_rate + ((hours_parked - 3) * exceeding_rate_mp)
        when 2
          fee = flat_rate + ((hours_parked - 3) * exceeding_rate_lp)
        end
      end
    
      fee += (hours_parked / 24) * 5000
    
      fee
    end
    
    private
    def validate_unpark_params
      unless params[:reg_number].present?
        render json: { success: false, message: 'Invalid parameters. Vehicle registeration numqber is required.'}
      end
    end

    def validate_add_slots_params
      unless params[:number_of_entry_points].present? && params[:map_data].present?
        render json: { success: false, message: 'Invalid parameters. Make sure number of entry points and data map are correctly provided' }
      end
    end

    def validate_park_params
      unless params[:reg_number].present? && params[:size].present? && params[:size].to_i < 3 && params[:entry_point].present?
        render json: { success: false, message: 'Invalid parameters. Following fields are required: Vehicle registeration number, Vehicle size (0-2), entry_point' }
      end
    end  

end