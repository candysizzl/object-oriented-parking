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
   git clone https://github.com/Adan-Asim/parking-management-system.git

2. **Navigate to the Rails backend directory:**
`cd parking-management-system`

3. **Install ruby gems:**
`bundle install`

4. **Migrate database:**
`bin/rails db:migrate`

5. **Install frontend dependencies:**
`cd react_frontend` then
`npm install`

6. **Start the rails server:**
`bin/rails server` It will be available at: http://localhost:3000

7. **Start the react frontend:**
`cd react_frontend` then
`npm start` It will be available at: http://localhost:3001


## API Routes:

### Park a Vehicle
- **Endpoint**: POST `/park`

- **Description:** Parks a vehicle in the available parking slots.

### Unpark a Vehicle
- **Endpoint**: POST `/unpark`

- **Description**: Unparks a vehicle, making the slot available for other vehicles.

### Add Parking Slots
- **Endpoint**: POST `/add-parking-slots`

- **Description**: Adds new parking slots to the parking lot.

### Reset Parking Lot
- **Endpoint**: POST `/reset-parking-lot`

- **Description**: Resets the parking lot, removing all vehicles.

### View Parking Lot Status
- **Endpoint**: GET `/view-parking-lot`

- **Description**: Retrieves and displays the current status of the parking lot.

### Free all Parking Space
- **Endpoint**: POST `/free-parking-space`

- **Description**: Frees up a parking space, making it available for parking.

### All of these API routes are access using React frontend with help of fetch.

### Admin View
<img width="1728" alt="image" src="https://github.com/Adan-Asim/Parking-Management-System/assets/67644268/f43d8cad-28ed-4612-b518-48a41546d36a">
<img width="1728" alt="image" src="https://github.com/Adan-Asim/Parking-Management-System/assets/67644268/29abeb43-1c75-414b-938c-928c258be801">

### User View
<img width="1728" alt="image" src="https://github.com/Adan-Asim/Parking-Management-System/assets/67644268/e0b0cfbc-71e8-4807-8bf7-982ea6adf467">
<img width="1728" alt="image" src="https://github.com/Adan-Asim/Parking-Management-System/assets/67644268/9a5f790e-692a-4b75-a582-c0563e2da91a">

## License
This project is licensed under the MIT License. See the LICENSE file for details.
