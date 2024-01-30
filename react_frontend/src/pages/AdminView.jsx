import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AddParkingSlots from "../components/AddParkingSlots.jsx";
import ViewParkingSlots from "../components/ViewParkingSlots.jsx";
import { viewParkingLot } from "../actions/actions.js";

const AdminViewPage = () => {
  const [parkingLotState, setParkingLotState] = useState([]);

  const getParkingLotState = () => {
    viewParkingLot()
      .then((response) => response.json())
      .then((data) => setParkingLotState(data.parking_lot_state))
      .catch((error) =>
        console.error("Error fetching parking lot data:", error),
      );
  };

  useEffect(() => {
    getParkingLotState();
  }, []);

  return (
    <div className="container mt-5 ">
      <Tabs defaultActiveKey="ViewParkingStatus" id="home-tabs">
        <Tab eventKey="ViewParkingStatus" title="View parking status">
          <ViewParkingSlots
            parkingLotState={parkingLotState}
            getParkingLotState={getParkingLotState}
          />
        </Tab>
        <Tab eventKey="AddParkingSlots" title="Add Parking Slots">
          <AddParkingSlots getParkingLotState={getParkingLotState} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminViewPage;
