# Parking Management System

## Overview

This project implements a Parking Management System with a Ruby on Rails backend and a React frontend, along with SQLite for Database. It allows users to perform various operations such as parking and unparking vehicles, adding parking slots, resetting the parking lot, viewing the current parking lot status, and freeing up parking spaces.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Ruby (latest version)
- Node.js (latest version)
- Rails (latest version)
- npm (latest version)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/parking-management-system.git```

2. **Navigate to the Rails backend directory:**
`cd parking-management-system`

3. **Install ruby gems:**
`bundle install`

4. **Migrate database:**
`bin/rails db:migrate`

5. **Install frontend dependencies:**
`cd react_frontend`
`npm install`

6. **Start the rails server:**
`bin/rails server`

It will be available at: http://localhost:3000

7. **Start the react frontend:**
`cd react_frontend`
`npm start`

It will be available at: http://localhost:3001


## API Routes:

### Park a Vehicle
Endpoint: POST `/park`

Description: Parks a vehicle in the available parking slots.

### Unpark a Vehicle
Endpoint: POST `/unpark`

Description: Unparks a vehicle, making the slot available for other vehicles.

### Add Parking Slots
Endpoint: POST `/add-parking-slots`

Description: Adds new parking slots to the parking lot.

### Reset Parking Lot
Endpoint: POST `/reset-parking-lot`

Description: Resets the parking lot, removing all vehicles.

### View Parking Lot
Endpoint: GET `/view-parking-lot`

Description: Retrieves and displays the current status of the parking lot.

### Free Parking Space
Endpoint: POST `/free-parking-space`

Description: Frees up a parking space, making it available for parking.

### All of these API routes are access using React frontend with help of fetch.

## License
This project is licensed under the MIT License. See the LICENSE file for details.