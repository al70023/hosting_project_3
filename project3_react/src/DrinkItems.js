import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import './DrinkItems.css';

function DrinkItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [drinkItemsData, setDrinkItemsData] = useState([]);

    const [items, setItemsOrdered] = useState(JSON.parse(localStorage.getItem("itemsOrderded")) || []);

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
        var items = localStorage.getItem("itemsOrdered");

        // If not, create the array.
        if (items === null) items = [];

        // If so, decode the array. 
        else items = JSON.parse(items);

        // Add our new item. 
        items.push(drinkItem);

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to LocalStorage. 
        localStorage.setItem("itemsOrdered", items);
        
        setItemsOrdered([...items, drinkItem])
    }

    function removeItem(drinkItem) {
        // Check if we already have an array in local storage.
        var items = JSON.parse(localStorage.getItem("itemsOrdered"));

        // Remove item
        for (var i = 0; i < items.length; i++) {    
            if (items[i].item_name === drinkItem.item_name) { 
                items.splice(i, 1); 
            }
        }

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to LocalStorage. 
        localStorage.setItem("itemsOrdered", items);
        
        setItemsOrdered([...items, drinkItem])
    }
   
    return(
        <div className = "drinkItems">
            <h1> Drink Items </h1>


            <div className = "drinkItemTable">
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
        
            <h1>Orders</h1>
            <ol>
                {JSON.parse(localStorage.getItem("itemsOrdered")).map((item) =>
                    <li>
                        {item.item_name}    {item.item_price}  <button type="button" onClick={() => removeItem(item)}>Remove Item</button>
                    </li>
                )}
            </ol>
            
        </div>
    );

}

export default DrinkItems;