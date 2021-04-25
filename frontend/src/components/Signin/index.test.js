import * as React from "react";
import * as ReactDOM from "react-dom";
import Login from "./index";
import { render, screen, getByText } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureStore([]);

describe("Login tests", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: false,
        user: null,
      },
      message: "",
    });
  });

  it("Login component renders successfully", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
