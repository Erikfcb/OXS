import { LOGIN, LOGOUT, LOGIN_ERROR } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return state;
    case LOGIN_ERROR:
      return action.payload;
    default:
      return state;
  }
};
