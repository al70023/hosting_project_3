import React, {useState, useReducer, useLocalStorage, createContext} from "react";
import './App.css';
import Home from './Home';
import ServerHome from './ServerHome';
import ManagerHome from './ManagerHome';
import CustomerHome from './CustomerHome';
import Nav from './Nav';
import MenuItems from './MenuItems';
import Inventory from './Inventory';
import EntreeItems from './EntreeItems';
import SideItems from "./SideItems";
import DrinkItems from "./DrinkItems";
import DessertItems from "./DessertItems";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";
import EmployeeReport from "./EmployeeReport";



import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RestockReport from "./RestockReport";
import SalesReport from "./SalesReport";

export var items = [];
export var totalCost = 0;

function App() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/ManagerHome" element={<ManagerHome />} />
            <Route exact path="/ServerHome" element={<ServerHome />} />
            <Route exact path="/CustomerHome" element={<CustomerHome />} />
            <Route exact path="/MenuItems" element={<MenuItems />} />
            <Route exact path="/Inventory" element={<Inventory />} />
            <Route exact path="/EntreeItems" element={<EntreeItems />} />
            <Route exact path="/SideItems" element={<SideItems />} />
            <Route exact path="/DrinkItems" element={<DrinkItems />} />
            <Route exact path="/DessertItems" element={<DessertItems />} />
            <Route exact path="/Checkout" element={<Checkout />} />
            <Route exact path="/OrderSummary" element={<OrderSummary />} />
            <Route exact path="/RestockReport" element={<RestockReport />} />
            <Route exact path="/SalesReport" element={<SalesReport />} />
            <Route exact path="/EmployeeReport" element={<EmployeeReport />} />
          </Routes>
        </div>
      </Router>
    );
  }

export default App;



