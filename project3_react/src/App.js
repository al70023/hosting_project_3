// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, {useState} from "react";
import './App.css';
import Home from './Home';
import ServerHome from './ServerHome';
import ManagerHome from './ManagerHome';
import CustomerHome from './CustomerHome';
import Nav from './Nav';
import MenuItems from './MenuItems';
import EntreeItems from './EntreeItems';
import SideItems from "./SideItems";
import DrinkItems from "./DrinkItems";
import DessertItems from "./DessertItems";



import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

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
            <Route exact path="/EntreeItems" element={<EntreeItems />} />
            <Route exact path="/SideItems" element={<SideItems />} />
            <Route exact path="/DrinkItems" element={<DrinkItems />} />
            <Route exact path="/DessertItems" element={<DessertItems />} />
          </Routes>
        </div>
      </Router>
    );
  }

export default App;


