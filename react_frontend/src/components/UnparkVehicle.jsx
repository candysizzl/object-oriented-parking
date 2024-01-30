import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { unparkVehicle } from "../actions/actions";

const UnparkVehicle = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [registrationNumber, setRegistrationNumber] = useState("");

  const handleUnpark = () => {
    setLoading(true);
    setMessage("");

    unparkVehicle({ reg_number: registrationNumber })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMessage(data.message);
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Error unparking vehicle.");
        console.error("Error unparking vehicle", error);
      });
  };

  return (
    <div className="mt-5">
      <h2>Unpark a Vehicle</h2>
      <Form className="mt-4">
        <Form.Group
          controlId="registrationNumber"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
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
          onClick={handleUnpark}
          className="mt-4"
          disabled={!registrationNumber}
        >
          {loading ? "Unparking..." : "Unpark"}
        </Button>

        {message && (
          <Alert
            variant={message.includes("success") ? "success" : "danger"}
            className="mt-4"
          >
            {message}
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default UnparkVehicle;
