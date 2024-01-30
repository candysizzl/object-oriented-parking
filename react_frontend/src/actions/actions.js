const APP_BASE_URL = "http://127.0.0.1:3000";

export const parkVehicle = (data) =>
  fetch(`${APP_BASE_URL}/parking/park`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const unparkVehicle = (data) =>
  fetch(`${APP_BASE_URL}/parking/unpark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const addParkingSlots = (data) =>
  fetch(`${APP_BASE_URL}/parking/add-parking-slots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const resetParkingLot = () =>
  fetch(`${APP_BASE_URL}/parking/reset-parking-lot`, {
    method: "POST",
  });

export const freeParkingSpace = () =>
  fetch(`${APP_BASE_URL}/parking/free-parking-space`, {
    method: "POST",
  });

export const viewParkingLot = () =>
  fetch(`${APP_BASE_URL}/parking/view-parking-lot`, {
    method: "GET",
  });
