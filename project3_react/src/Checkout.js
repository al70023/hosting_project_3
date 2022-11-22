import React from 'react';
import { useState } from 'react';

function Checkout() {

    const [items, setItemsOrdered] = useState(JSON.parse(sessionStorage.getItem("itemsOrderded")) || []);

    const [totalCost, setTotalCost] = useState(parseFloat(sessionStorage.getItem("orderCost")) || 0.00);

    // Handling when a user clicks the Add a New Menu Item button
    const handleSubmitOrder = (event) => {
        event.preventDefault();

        var items = JSON.parse(sessionStorage.getItem("itemsOrdered"));
        var itemsIDs = [];
        var itemsString = "";

        var totalCost = parseFloat(sessionStorage.getItem("orderCost"));

        // loop through current order for each item
        for (var i = 0; i < items.length; i++) {
            itemsIDs.push(items[i].item_id);
            itemsString += items[i].item_name;
            if (i != items.length - 1) {
                itemsString += ", ";
            }
        }

        const currDate = new Date().toLocaleDateString();
        const currTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

        // Assign the values from the order to a new order instance
        const newOrder = {
            time: currDate + " " + currTime, 
            cust_name: "default", 
            items_ordered: itemsIDs, 
            items_ordered_string: itemsString, 
            total_cost: totalCost, 
            credit_card_num: "1111111111111111", 
            employee_id: "1" 
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newOrder)          // body = info for the menu item to add (from newMenuItem instance)
        }

        // Add the new menu item into the table
        fetch('http://localhost:3001/orderSummary/insert', requestOptions)
            .then(res => res.json())
            .then(window.location.replace('/OrderSummary'));
    }

    function removeItem(dessertItem) {
        // Check if we already have an array in local storage.
        var items = JSON.parse(sessionStorage.getItem("itemsOrdered"));
        var totalCost = parseFloat(sessionStorage.getItem("orderCost"));

        // Remove item
        for (var i = 0; i < items.length; i++) {
            if (items[i].item_name === dessertItem.item_name) {
                items.splice(i, 1);
                totalCost -= dessertItem.item_price;
            }
        }

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to sessionStorage. 
        sessionStorage.setItem("itemsOrdered", items);
        sessionStorage.setItem("orderCost", totalCost);

        setItemsOrdered([...items, dessertItem])
        setTotalCost(totalCost);
    }


    return (
        <div>
            <div class="CheckoutPage">
                <h1>
                    Checkout Page
                </h1>
                <br></br>
                <h1>Orders (Total is: {totalCost.toFixed(2)})</h1>
                <br></br>
                {JSON.parse(sessionStorage.getItem("itemsOrdered")) != null &&
                    <ol>
                        {JSON.parse(sessionStorage.getItem("itemsOrdered")).map((item) =>
                            <li>
                                {item.item_name}    {item.item_price}  <button type="button" onClick={() => removeItem(item)}>Remove Item</button>
                            </li>
                        )}
                    </ol>}

                <button type="submit" onClick={handleSubmitOrder}>Submit Order</button>

            </div>
        </div>
    );
}

export default Checkout;