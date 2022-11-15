import React, { Component, createContext } from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import './EntreeItems.css';



function EntreeItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [entreeItemsData, setEntreeItemsData] = useState([]);

    const [items, setItemsOrdered] = useState(JSON.parse(sessionStorage.getItem("itemsOrderded")) || []);

    const [totalCost, setTotalCost] = useState(parseFloat(sessionStorage.getItem("orderCost")) || 0.00);

    const fetchEntreeItems = () => {
        fetch('http://localhost:3001/EntreeItems')
            .then(res => res.json())
            .then(json => setEntreeItemsData(json))
    }

    // Call the function on the component mount
    useEffect(() => {
        fetchEntreeItems();
    }, []);

    function addItem(entreeItem) {
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
        items.push(entreeItem);
        totalCost += entreeItem.item_price;

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to sessionStorage. 
        sessionStorage.setItem("itemsOrdered", items);
        sessionStorage.setItem("orderCost", totalCost);
        
        setItemsOrdered([...items, entreeItem])
        setTotalCost(totalCost);
    }

    function removeItem(entreeItem) {
        // Check if we already have an array in local storage.
        var items = JSON.parse(sessionStorage.getItem("itemsOrdered"));
        var totalCost = parseFloat(sessionStorage.getItem("orderCost"));

        // Remove item
        for (var i = 0; i < items.length; i++) {    
            if (items[i].item_name === entreeItem.item_name) { 
                items.splice(i, 1); 
                totalCost -= entreeItem.item_price;
            }
        }

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to sessionStorage. 
        sessionStorage.setItem("itemsOrdered", items);
        sessionStorage.setItem("orderCost", totalCost);
        
        setItemsOrdered([...items, entreeItem])
        setTotalCost(totalCost);
    }

    return (
        <div className="entreeItems">
            <h1> Entree Items </h1>


            <div className="entreeItemTable">
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
                            {entreeItemsData.map((entreeItem) => (  
                                <tr>
                                    <td name="name">{entreeItem.item_name}</td>
                                    <td name="price">{entreeItem.item_price}</td>
                                    <td><button type="button" onClick={() => addItem(entreeItem)}>Add Item</button></td>
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

        </div>
    );
}

export default EntreeItems;