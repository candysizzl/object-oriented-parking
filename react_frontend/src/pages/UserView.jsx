import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import ParkVehicle from "../components/ParkVehicle.jsx";
import UnparkVehicle from "../components/UnparkVehicle.jsx";

const UserViewPage = () => {
  return (
    <div className="container mt-5 ">
      <Tabs defaultActiveKey="ParkVehicle" id="home-tabs">
        <Tab eventKey="ParkVehicle" title="Park Vehicle">
          <ParkVehicle />
        </Tab>
        <Tab eventKey="UnparkVehicle" title="UnparkVehicle">
          <UnparkVehicle />
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserViewPage;
