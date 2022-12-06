import React from 'react';
import {Link} from 'react-router-dom';
import './ManagerHome.css';

function ManagerHome(){
    return(
    <div >
        <div class="homeTopContainer">
        <button className = "btnManagerHome">Manager Home</button>
        </div>
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
    </div>
    );
}

export default ManagerHome;