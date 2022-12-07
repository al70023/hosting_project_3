import React, { useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './ManagerHome.css';

function ManagerHome(){

    function handleSignOut(event) {
        sessionStorage.clear();
        window.location.replace('/');
    }

    if (JSON.parse(sessionStorage.getItem("employeeSession") === null) || JSON.parse(sessionStorage.getItem("employeeSession")).position != 2) {
        useEffect(() => {
            setTimeout(() => {
                sessionStorage.clear();
                window.location.replace("/")
            }, 2000)
          }, [])
        return(
            <div>
                <p>Restricted access, redirecting home...</p>
            </div>
        )
    }

    return(
    <div >
        <div class="homeTopContainer">
        <p class = "employeeSession">
            Employee: {JSON.parse(sessionStorage.getItem("employeeSession")).employee_name}
            <br/>
            ID: {JSON.parse(sessionStorage.getItem("employeeSession")).employee_id}
        </p>    
        <button className = "btnManagerHome">Manager Home</button>
        </div>
        <button class ="btnLogOutt" onClick={ (e) => handleSignOut(e)}>Log Out</button>
        <div>
        <Link activeClassName="active" to={'/MenuItems'}>
        <a>
            <button className = "btnViewItem"> View Menu Items</button>
        </a>
        </Link>
        </div>
        <div class="mt-5">
        <Link activeClassName="active" to={'/Inventory'}>
        <a>
            <button className = "btnViewItem"> View Inventory</button>
        </a>
        </Link>
        </div> 
        <div class="mt-5">
        <Link activeClassName="active" to={'/RestockReport'}>
        <a>
            <button className = "btnViewItem"> View Restock Report</button>
        </a>
        </Link>
        </div>
        <div class="mt-5">
        <Link activeClassName="active" to={'/SalesReport'}>
        <a>
            <button className = "btnViewItem"> View Sales Report</button>
        </a>
        </Link>
        </div>
        <div class="mt-5">
        <Link activeClassName="active" to={'/EmployeeReport'}>
        <a>
            <button className = "btnViewItem"> View Employee Report</button>
        </a>
        </Link>
        </div>
        <div class="mt-5">
        <Link activeClassName="active" to={'/ExcessReport'}>
        <a>
            <button className = "btnViewItem"> View Excess Report</button>
        </a>
        </Link>
        </div>
        <div class="mt-5">
        <Link activeClassName="active" to={'/ServerHome'}>
        <a>
            <button className = "btnViewItem"> Server Portal</button>
        </a>
        </Link>
        </div> 
    </div>
    );
}

export default ManagerHome;