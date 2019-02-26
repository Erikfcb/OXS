import { combineReducers } from "redux";
import admin from "./admin";
import tenants from "./tenants";

export default combineReducers({
  admin,
  tenants
});
