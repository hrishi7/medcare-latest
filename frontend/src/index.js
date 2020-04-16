import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { pink, blue, deepPurple } from "@material-ui/core/colors";
import { CartProvider } from "./components/common/CartContext";
import { Provider } from "react-redux";
import store from "./store";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    textPrimary: blue[700]
  },
  status: {
    danger: "orange"
  },
  typography: {
    fontFamily: "Raleway, Arial",
    textPrimary: deepPurple
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CartProvider>
          <App />
        </CartProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
