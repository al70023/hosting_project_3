import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import './SideItems.css';

function SideItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [sideItemsData, setSideItemsData] = useState([]);

    const [items, setItemsOrdered] = useState(JSON.parse(localStorage.getItem("itemsOrderded")) || []);

    const fetchSideItems = () => {
        fetch('http://localhost:3001/SideItems')
        .then(res => res.json())
        .then(json => setSideItemsData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchSideItems();
    }, []);

    function addItem(sideItem) {
        // Check if we already have an array in local storage.
        var items = localStorage.getItem("itemsOrdered");

        // If not, create the array.
        if (items === null) items = [];

        // If so, decode the array. 
        else items = JSON.parse(items);

        // Add our new item. 
        items.push(sideItem);

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to LocalStorage. 
        localStorage.setItem("itemsOrdered", items);
        
        setItemsOrdered([...items, sideItem])
    }

    function removeItem(sideItem) {
        // Check if we already have an array in local storage.
        var items = JSON.parse(localStorage.getItem("itemsOrdered"));

        // Remove item
        for (var i = 0; i < items.length; i++) {    
            if (items[i].item_name === sideItem.item_name) { 
                items.splice(i, 1); 
            }
        }

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to LocalStorage. 
        localStorage.setItem("itemsOrdered", items);
        
        setItemsOrdered([...items, sideItem])
    }

    return(
        <div className = "sideItems">
            <h1> Side Items </h1>


            <div className = "sideItemTable">
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
                        {sideItemsData.map((sideItem) => (
                            <tr>
                                <td>{sideItem.item_name}</td>
                                <td>{sideItem.item_price}</td>
                                <td><button type="button" onClick={() => addItem(sideItem)}>Add Item</button></td>
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

export default SideItems;