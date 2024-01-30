import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { parkVehicle } from "../actions/actions.js";

const ParkVehicle = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [entryPoint, setEntryPoint] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vehicleSize, setVehicleSize] = useState("");

  const handlePark = () => {
    setLoading(true);
    setMessage("");

    parkVehicle({
      reg_number: registrationNumber,
      entry_point: entryPoint,
      size: vehicleSize,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMessage(data.message);
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Error parking vehicle.");
        console.error("Error parking vehicle:", error);
      });
  };

  return (
    <div className="mt-5">
      <h2>Park a Vehicle</h2>
      <Form className="mt-4">
        <Form.Group
          controlId="entryPoint"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          <Form.Label>Vehicle Entry Point </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter entry point"
            value={entryPoint}
            onChange={(e) => setEntryPoint(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          controlId="size"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "70px",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          <Form.Label>Vehicle Size </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter vehicle size"
            value={vehicleSize}
            onChange={(e) => setVehicleSize(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          controlId="registrationNumber"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            width: "100%",
            marginBottom: "15px",
            marginTop: "15px",
          }}
        >
          <Form.Label>Registration Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Vehicle registration number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handlePark}
          className="mt-4"
          disabled={!(entryPoint && registrationNumber)}
        >
          {loading ? "Parking Vehicle..." : "Park Vehicle"}
        </Button>
      </Form>
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

export default ParkVehicle;
