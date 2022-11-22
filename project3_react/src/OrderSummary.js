import React from 'react';
import { useState, useEffect } from 'react';

function OrderSummary() {

    const [orderSummaryData, setOrderSummaryData] = useState([]);

    const fetchOrderSummary = () => {
        fetch('http://localhost:3001/OrderSummary')
        .then(res => res.json())
        .then(json => setOrderSummaryData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchOrderSummary();
    }, []);

    return (
        <div className="OrderSummary">
            <h1>Order Summary</h1>
            <br></br>

            {orderSummaryData.map((orderItem) => (
                <ul>
                    <li>
                        Time: {orderItem.time}
                    </li>
                    <li>
                        Customer Name: {orderItem.cust_name}
                    </li>
                    <li>
                        Items Ordered: {orderItem.items_ordered_string}
                    </li>
                    <li>
                        Total Price: {orderItem.total_cost.toFixed(2)}
                    </li>
                    <li>
                        Credit Card Number: {orderItem.credit_card_num}
                    </li>
                    <li>
                        Employee ID: {orderItem.employee_id}
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default OrderSummary;