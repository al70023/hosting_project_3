import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import { useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import './DessertItems.css';

const Back = () => {
    let navigate = useNavigate();
    return (
        <>
          <button  className = "btnBackDessert" onClick={() => navigate(-1)}>Back</button> 
        </>
    );
};

function DessertItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [dessertItemsData, setDessertItemsData] = useState([]);

    const [items, setItemsOrdered] = useState(JSON.parse(sessionStorage.getItem("itemsOrderded")) || []);

    const [totalCost, setTotalCost] = useState(parseFloat(sessionStorage.getItem("orderCost")) || 0.00);

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
        items.push(dessertItem);
        totalCost += dessertItem.item_price;

        // Encode the array.
        items = JSON.stringify(items);

        // Add back to sessionStorage. 
        sessionStorage.setItem("itemsOrdered", items);
        sessionStorage.setItem("orderCost", totalCost);
        
        setItemsOrdered([...items, dessertItem])
        setTotalCost(totalCost);
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

    return(
        <div className = "dessertItems">

            <div className = "dessertItemTable">
                <button className = "btnDessertItem">Dessert Items</button>

                {(JSON.parse(sessionStorage.getItem("employeeSession"))) != null ?
                (<p class = "employeeSession">
                    Employee: {JSON.parse(sessionStorage.getItem("employeeSession")).employee_name}
                    <br/>
                    ID: {JSON.parse(sessionStorage.getItem("employeeSession")).employee_id}
                </p>
                ) : (<p class = "googleSession">
                    Hello, {jwt_decode(sessionStorage.getItem("googleSession")).given_name}
                </p>)
                }     

                <Back/>
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
                        {dessertItemsData.map((dessertItem) => (
                            <tr>
                                <td>{dessertItem.item_name}</td>
                                <td>{dessertItem.item_price}</td>
                                <td><button className = "addDessertButton" type="button" onClick={() => addItem(dessertItem)}>Add Item</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </form>
                        
                

            </div>
        
            <h1>Orders (Total is: {totalCost.toFixed(2)})</h1>
            <p><br></br></p>
            {JSON.parse(sessionStorage.getItem("itemsOrdered")) != null &&
                <ol>
                {JSON.parse(sessionStorage.getItem("itemsOrdered")).map((item) =>
                    <li>
                        <button className ="btnAddDessertName">{item.item_name}</button>    <button className ="btnAddEntreeName">{item.item_price} </button>  <button className = "removeEntreeButton" type="button" onClick={() => removeItem(item)}>Remove Item</button>
                        <p><br></br></p>
                    </li>
                )}
            </ol>}

            <a href="Checkout">
                <button className = "checkoutDessertButton">Checkout</button>
            </a>
            
        </div>
    );

}

export default DessertItems;
