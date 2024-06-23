import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { constantAction } from "../helpers/actionTypes";
import LoginReducer from "./reducers/LoginReducer";

const allReducers = combineReducers({
  login: LoginReducer,
});

export const rootReducer = (state, action) => {
  console.log("clearReduxStore", state, action);
  // Clear all data in redux store to initial.
  if (action.type === constantAction.RESET_STORE) {
    state = undefined;
  }
  console.log("clearReduxStore1", state, action);

  return allReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
