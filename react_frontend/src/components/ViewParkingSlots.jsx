import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { freeParkingSpace } from "../actions/actions.js";

const ViewParkingSlots = ({ parkingLotState, getParkingLotState }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFreeParkingSpace = () => {
    setLoading(true);
    setMessage("");

    freeParkingSpace()
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMessage(data.message);
        getParkingLotState();
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Error fetching parking lot data.");
        console.error("Error fetching parking lot data:", error);
      });
  };

  return (
    <div className="mt-4">
      <h2>Parking Lot Status</h2>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {parkingLotState.map((slot, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #000",
              padding: "10px",
              margin: "10px",
              flexBasis: "200px",
              backgroundColor: slot.status === "empty" ? "#" : "#ADD8E6",
            }}
          >
            <p>
              <strong>Slot {index + 1}</strong>
            </p>
            <hr />
            <p>
              <strong>Size:</strong>{" "}
              {slot.size === 0 ? "SP" : slot.size === 1 ? "MP" : "LP"}
            </p>
            <p>
              <strong>Distances:</strong> {JSON.stringify(slot.distances)}
            </p>
            <p>
              <strong>Status:</strong> {slot.status}
            </p>
            <p>
              <strong>Vehicle:</strong>{" "}
              {slot.vehicle ? JSON.stringify(slot.vehicle?.reg_number) : "N/A"}
            </p>
          </div>
        ))}
        <div className="d-flex justify-content-center mt-4"></div>
      </div>
      <Button
        variant="primary"
        className="mt-4 ml-4"
        onClick={handleFreeParkingSpace}
        disabled={loading}
      >
        {loading ? "Freeing Parking Space..." : "Free Parking Space"}
      </Button>
      {message && (
        <Alert
          variant={message.includes("success") ? "success" : "danger"}
          className="mt-4"
        >
          {message}
        </Alert>
      )}
    </div>
  );
};

export default ViewParkingSlots;
