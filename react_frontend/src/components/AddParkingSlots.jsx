import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { addParkingSlots, resetParkingLot } from "../actions/actions.js";

const AddParkingSlotsComponent = ({ getParkingLotState }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [smallInput, setSmallInput] = useState("");
  const [mediumInput, setMediumInput] = useState("");
  const [largeInput, setLargeInput] = useState("");
  const [entryPoints, setEntryPoints] = useState("");

  const handleAddSlotsSubmit = () => {
    setLoading(true);
    setMessage("");

    const input = [{ 0: smallInput }, { 1: mediumInput }, { 2: largeInput }];

    const mapData = input.reduce((acc, item) => {
      const [index, values] = Object.entries(item)[0];
      const distances = values
        .substring(1, values.length - 1)
        .split(",")
        .map(Number);
      acc[index] = [distances];
      return acc;
    }, {});

    addParkingSlots({ map_data: mapData, number_of_entry_points: entryPoints })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMessage(data.message);
        getParkingLotState();
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Error adding parking slots.");
        console.error("Error adding parking slots:", error);
      });
  };

  const handleDeleteAllSlots = () => {
    resetParkingLot()
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMessage(data.message);
        getParkingLotState();
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Error deleting parking slots.");
        console.error("Error deleting parking slots:", error);
      });
  };

  return (
    <div className="mt-5">
      <h2>Add Parking Slots Distances</h2>
      <Form className="mt-4">
        <Form.Group
          controlId="entryPointsInput"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1px",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          <Form.Label>Number of entry points </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter number of entry points > 2"
            value={entryPoints}
            onChange={(e) => setEntryPoints(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          controlId="smallInput"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          <Form.Label>Small Parking Slots </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter distances in format: [(1,2,3), [4,5,6]]"
            value={smallInput}
            onChange={(e) => setSmallInput(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          controlId="mediumInput"
          className="mt-3"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            width: "100%",
            marginBottom: "15px",
            marginTop: "15px",
          }}
        >
          <Form.Label>Medium Parking Slots </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter distances in format: [(1,2,3), [4,5,6]]"
            value={mediumInput}
            onChange={(e) => setMediumInput(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          controlId="largeInput"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            width: "100%",
            marginBottom: "15px",
            marginTop: "15px",
          }}
        >
          <Form.Label>Large Parking Slots</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter distances in format: [(1,2,3), [4,5,6]]"
            value={largeInput}
            onChange={(e) => setLargeInput(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleAddSlotsSubmit}
          className="mt-4"
          disabled={!entryPoints || !(smallInput, largeInput, mediumInput)}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>

        <Button
          variant="danger"
          className="mt-4 mx-4"
          onClick={handleDeleteAllSlots}
        >
          {loading ? "Deleting..." : "Delete All Slots"}
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

export default AddParkingSlotsComponent;
