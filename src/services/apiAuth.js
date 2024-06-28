// src/services/apiAuth.js
import api from "./axios";

export async function login({ username, password }) {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });
    console.log("Login --" + response.data);
    //CHECK HERE
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid username or password");
    } else {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

export async function logout() {
  try {
    const response = await api.post("/auth/logout");
    console.log("LOGOUT - " + response);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
}

export async function getCurrentUser() {
  try {
    // Check if there is an active session
    const sessionResponse = await api.get("/auth/session");
    const session = sessionResponse.data;

    if (!session.IsAuthenticated) return null;

    // If session is active, get the current user
    const userResponse = await api.get("/auth/currentUser");
    console.log("Heavy - " + userResponse.data);
    //CHECK HERE
    return userResponse.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    } else {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}
