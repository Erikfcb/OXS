import axios from "axios";
import { LOGIN, LOGOUT, FETCH_TENANTS, LOGIN_ERROR } from "./types";
import history from "../history";

// Action creators
export const login = ({ username, password }) => async dispatch => {
  try {
    const res = await axios.post("/api/login", { username, password });
    localStorage.setItem("token", res.data.token);
    dispatch({ type: LOGIN, payload: res.data });
    history.push("/tenants");
  } catch (err) {
    dispatch({ type: LOGIN_ERROR, payload: { error: "Wrong details" } });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};

export const fetchTenants = () => async dispatch => {
  const token = localStorage.getItem("token");
  const res = await axios({
    method: "GET",
    url: "/api/tenants",
    headers: {
      authorization: token
    }
  });
  dispatch({ type: FETCH_TENANTS, payload: res.data });
};

export const deleteTenant = tenantId => async dispatch => {
  const token = localStorage.getItem("token");

  const res = await axios({
    method: "DELETE",
    url: "/api/delete",
    headers: {
      authorization: token
    },
    data: { tenantId }
  });

  dispatch({ type: FETCH_TENANTS, payload: res.data });
};

export const createTenant = tenant => async dispatch => {
  const token = localStorage.getItem("token");

  const res = await axios({
    method: "POST",
    url: "/api/create",
    headers: {
      authorization: token
    },
    data: tenant
  });

  dispatch({ type: FETCH_TENANTS, payload: res.data });
};

export const updateTenant = update => async dispatch => {
  const token = localStorage.getItem("token");

  const res = await axios({
    method: "PUT",
    url: "/api/update",
    headers: {
      authorization: token
    },
    data: update
  });

  dispatch({ type: FETCH_TENANTS, payload: res.data });
};
