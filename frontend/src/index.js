import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter} from 'react-router-dom';
import {store} from './state/store';
import {Provider} from 'react-redux';
import { CartProvider } from "react-use-cart";

ReactDOM.render(
    <Provider store={store}>
<BrowserRouter>
<CartProvider>
    <App />
</CartProvider>
</BrowserRouter>
</Provider>,
document.getElementById("root"));
