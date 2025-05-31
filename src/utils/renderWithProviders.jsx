import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/configureStore";

// Function to render components with Redux store provider
const renderWithProviders = (
  ui,
  { store: customStore = store, ...renderOptions } = {} // Renamed `store` to `customStore` to avoid the conflict
) => {
  // Wrapper component that provides the Redux store to children
  const Wrapper = ({ children }) => {
    return <Provider store={customStore}>{children}</Provider>;
  };

  // Render the UI wrapped with the Provider and return relevant data
  return { customStore, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithProviders;
