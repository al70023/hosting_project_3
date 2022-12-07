import React from 'react';
import { useState, useEffect } from 'react';
import './OrderSummary.css';

function OrderSummary() {

    const [orderSummaryData, setOrderSummaryData] = useState([]);

    async function fetchOrderSummary() {
        const response = await fetch('http://localhost:3001/orderSummary/');
        const data = await response.json();
        setOrderSummaryData(data);
    }

    fetchOrderSummary();

    function handleSignOut(event) {
        sessionStorage.clear();
        window.location.replace('/');
    }

    function handleNewOrderServer(event) {
        const temp = sessionStorage.getItem("employeeSession");
        sessionStorage.clear();
        sessionStorage.setItem("employeeSession", temp);
        window.location.replace("/ServerHome");
    }

    function handleNewOrderCustomer(event) {
        const temp = sessionStorage.getItem("googleSession");
        sessionStorage.clear();
        sessionStorage.setItem("googleSession", temp);
        window.location.replace("/CustomerHome");
    }

    return (
        <div className="OrderSummary">
            <button className = "btnOrderSummaryItem">Order Summary</button>

            <br></br>

            {orderSummaryData.map((orderItem) => (
                <ul>
                    <li>
                       <button className = "btnOrderList">Time: {orderItem.time}</button>
                    </li>
                    <li>
                        <br></br>
                        <button className = "btnOrderList">Customer Name: {orderItem.cust_name}</button>
                        
                    </li>
                    <li>
                        <br></br>
                        <button className = "btnOrderList"> Items Ordered: {orderItem.items_ordered_string}</button>
                    </li>
                    <li>
                        <br></br>
                        <button className = "btnOrderList">Total Price: {orderItem.total_cost.toFixed(2)}</button>
                    </li>
                    <li>
                        <br></br>
                        <button className = "btnOrderList">Employee ID: {orderItem.employee_id}</button>
                    </li>
                </ul>
            ))}
            
              <br></br>
              <br></br>
              <br></br>
            <button class ="btnReturnHome" onClick={ (e) => handleSignOut(e)}>Return Home</button>
            {JSON.parse(sessionStorage.getItem("employeeSession") === null) &&
                <button class="newOrder" onClick={ (e) => handleNewOrderCustomer(e)}>Place New Order</button>
            }
            {(sessionStorage.getItem("googleSession") === null) &&
                <button class="newOrder" onClick={ (e) => handleNewOrderServer(e)}>Place New Order</button>
            }
        </div>
    );
}

export default OrderSummary;
