import React from 'react';
import {Link} from 'react-router-dom';
//import './ManagerHome.css';

function ManagerHome(){
    return(
    <div >
        <div class="homeTopContainer">
            <h1 class="text-6xl">
                Manager Home
            </h1>
        <p class="mt-6 mb-16">This is the landing page for managers.</p>
        </div>
        <div>
        <Link activeClassName="active" to={'/MenuItems'}>
        <a class="font-bold rounded bg-red-300 text-lg">View Menu Items</a>
        </Link>
        </div>
        <div class="mt-5">
        <Link activeClassName="active" to={'/Inventory'}>
        <a class="font-bold rounded bg-red-300 text-lg">View Inventory</a>
        </Link>
        </div> 
        <div class="mt-5">
        <Link activeClassName="active" to={'/RestockReport'}>
        <a class="font-bold rounded bg-red-300 text-lg">View Restock Report</a>
        </Link>
        </div>
        <div class="mt-5">
        <Link activeClassName="active" to={'/SalesReport'}>
        <a class="font-bold rounded bg-red-300 text-lg">View Sales Report</a>
        </Link>
        </div>
        <div class="mt-5">
        <Link activeClassName="active" to={'/EmployeeReport'}>
        <a class="font-bold rounded bg-red-300 text-lg">View Employee Report</a>
        </Link>
        </div>
        <div class="mt-5">
        <Link activeClassName="active" to={'/ExcessReport'}>
        <a class="font-bold rounded bg-red-300 text-lg">View Excess Report</a>
        </Link>
        </div>
    </div>
    );
}

export default ManagerHome;