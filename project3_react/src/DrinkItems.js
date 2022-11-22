import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import './DrinkItems.css';

function DrinkItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [drinkItemsData, setDrinkItemsData] = useState([]);

    const [items, setItemsOrdered] = useState(JSON.parse(sessionStorage.getItem("itemsOrderded")) || []);

    const [totalCost, setTotalCost] = useState(parseFloat(sessionStorage.getItem("orderCost")) || 0.00);

    const fetchDrinkItems = () => {
        fetch('http://localhost:3001/DrinkItems')
        .then(res => res.json())
        .then(json => setDrinkItemsData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchDrinkItems();
    }, []);


    function addItem(drinkItem) {
        // Check if we already have an array in local storage.
        var items = sessionStorage.getItem("itemsOrdered");
        var totalCost = parseFloat(sessionStorage.getItem("orderCost"));

        // If not, create the array.
        if (items === null) { 
            items = [];
            totalCost = 0.00;
        }

        // If so, decode the array. 
        else {
            items = JSON.parse(items);
        }

        // Add our new item. 
        items.push(drinkItem);
        totalCost += drinkItem.item_price;

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to sessionStorage. 
        sessionStorage.setItem("itemsOrdered", items);
        sessionStorage.setItem("orderCost", totalCost);
        
        setItemsOrdered([...items, drinkItem])
        setTotalCost(totalCost);
    }

    function removeItem(drinkItem) {
        // Check if we already have an array in local storage.
        var items = JSON.parse(sessionStorage.getItem("itemsOrdered"));
        var totalCost = parseFloat(sessionStorage.getItem("orderCost"));

        // Remove item
        for (var i = 0; i < items.length; i++) {    
            if (items[i].item_name === drinkItem.item_name) { 
                items.splice(i, 1); 
                totalCost -= drinkItem.item_price;
            }
        }

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to sessionStorage. 
        sessionStorage.setItem("itemsOrdered", items);
        sessionStorage.setItem("orderCost", totalCost);
        
        setItemsOrdered([...items, drinkItem])
        setTotalCost(totalCost);
    }
   
    return(
        <div className = "drinkItems">

            <div className = "drinkItemTable">
                <button className = "btnDrinkItem">Drink Items</button>
                <p><br></br></p>
                <form>
                <table>
                    <thead>
                        <tr>
                            {/* Table Column Headers */}
                            <th>Name</th> 
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {drinkItemsData.map((drinkItem) => (
                            <tr>
                                <td>{drinkItem.item_name}</td>
                                <td>{drinkItem.item_price}</td>
                                <td><button type="button" onClick={() => addItem(drinkItem)}>Add Item</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </form>
                        
                

            </div>
        
            <h1>Orders (Total is: {totalCost.toFixed(2)})</h1>
            {JSON.parse(sessionStorage.getItem("itemsOrdered")) != null &&
                <ol>
                {JSON.parse(sessionStorage.getItem("itemsOrdered")).map((item) =>
                    <li>
                        {item.item_name}    {item.item_price}  <button type="button" onClick={() => removeItem(item)}>Remove Item</button>
                    </li>
                )}
            </ol>}
            
            <a href="Checkout">
                <button className = "checkoutButton">Checkout</button>
            </a>
            
        </div>
    );

}

export default DrinkItems;