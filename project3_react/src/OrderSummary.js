import React from 'react';
import { useState, useEffect } from 'react';
import './OrderSummary.css';

function OrderSummary() {

    const [orderSummaryData, setOrderSummaryData] = useState([]);

    const fetchOrderSummary = () => {
        fetch('https://node-deployment-jaq0.onrender.com/OrderSummary')
        .then(res => res.json())
        .then(json => setOrderSummaryData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchOrderSummary();
    }, []);

    function handleSignOut(event) {
        sessionStorage.clear();
        window.location.replace('/');
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
        </div>
    );
}

export default OrderSummary;
