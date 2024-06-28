// src/services/apiPatients.js
import api from "./axios";

export async function getPatients() {
  try {
    const response = await api.get("/patients");
    console.log("Get All Patients --", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getPatientById(patientId) {
  try {
    const response = await api.get(`/patients/${patientId}`);
    console.log("Get Patient By ID --", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createPatient(patientData) {
  try {
    console.log("Creating patient with data:", patientData); // Log the data being sent
    const response = await api.post("/patients", patientData);
    console.log("Create Patient --", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updatePatient(patientId, patientData) {
  try {
    console.log("Updating patient with data:", patientId, patientData); // Log the data being sent
    const response = await api.put(`/patients/${patientId}`, patientData);
    console.log("RESPONSE OF UPDATEPATIENT API", response);
    console.log("Update Patient --", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deletePatient(patientId) {
  try {
    const response = await api.delete(`/patients/${patientId}`);
    console.log("Delete Patient --", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

function handleApiError(error) {
  if (error.response) {
    // Server responded with a status other than 200 range
    throw new Error(error.response.data || error.response.statusText);
  } else if (error.request) {
    // Request was made but no response was received
    throw new Error("No response received from server");
  } else {
    // Something happened in setting up the request
    throw new Error(error.message);
  }
}
