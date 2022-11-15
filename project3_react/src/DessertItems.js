import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import './DessertItems.css';

function DessertItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [dessertItemsData, setDessertItemsData] = useState([]);

    const [items, setItemsOrdered] = useState(JSON.parse(localStorage.getItem("itemsOrderded")) || []);

    const fetchDessertItems = () => {
        fetch('http://localhost:3001/DessertItems')
        .then(res => res.json())
        .then(json => setDessertItemsData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchDessertItems();
    }, []);

    function addItem(dessertItem) {
        // Check if we already have an array in local storage.
        var items = localStorage.getItem("itemsOrdered");

        // If not, create the array.
        if (items === null) items = [];

        // If so, decode the array. 
        else items = JSON.parse(items);

        // Add our new item. 
        items.push(dessertItem);

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to LocalStorage. 
        localStorage.setItem("itemsOrdered", items);
        
        setItemsOrdered([...items, dessertItem])
    }

    function removeItem(dessertItem) {
        // Check if we already have an array in local storage.
        var items = JSON.parse(localStorage.getItem("itemsOrdered"));

        // Remove item
        for (var i = 0; i < items.length; i++) {    
            if (items[i].item_name === dessertItem.item_name) { 
                items.splice(i, 1); 
            }
        }

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to LocalStorage. 
        localStorage.setItem("itemsOrdered", items);
        
        setItemsOrdered([...items, dessertItem])
    }

    return(
        <div className = "dessertItems">
            <h1> Dessert Items </h1>


            <div className = "dessertItemTable">
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
                        {dessertItemsData.map((dessertItem) => (
                            <tr>
                                <td>{dessertItem.item_name}</td>
                                <td>{dessertItem.item_price}</td>
                                <td><button type="button" onClick={() => addItem(dessertItem)}>Add Item</button></td>
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

export default DessertItems;