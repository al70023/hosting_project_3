import React, { Component, createContext } from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import jwt_decode from 'jwt-decode';
import './EntreeItems.css';
import { useNavigate} from "react-router-dom";

const Back = () => {
    let navigate = useNavigate();
    return (
        <>
          <button className = "btnBackEntree" onClick={() => navigate(-1)}>Back</button> 
        </>
    );
};


function EntreeItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [entreeItemsData, setEntreeItemsData] = useState([]);

    const [items, setItemsOrdered] = useState(JSON.parse(sessionStorage.getItem("itemsOrderded")) || []);

    const [totalCost, setTotalCost] = useState(parseFloat(sessionStorage.getItem("orderCost")) || 0.00);

    const fetchEntreeItems = () => {
        fetch('https://node-deployment-jaq0.onrender.com/EntreeItems')
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

            <div className="entreeItemTable">
                <button className = "btnEntreeItem">Entree Items</button>

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
                            {entreeItemsData.map((entreeItem) => (  
                                <tr>
                                    <td name="name">{entreeItem.item_name}</td>
                                    <td name="price">{entreeItem.item_price}</td>
                                    <td><button className = "addEntreeButton" type="button" onClick={() => addItem(entreeItem)}>Add Item</button></td>
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
                        <button className ="btnAddEntreeName">{item.item_name}</button>    <button className ="btnAddEntreeName">{item.item_price} </button>  <button className = "removeEntreeButton" type="button" onClick={() => removeItem(item)}>Remove Item</button>
                        <p><br></br></p>
                    </li>
                )}
            </ol>}

        <a href="Checkout">
            <button className = "checkoutEntreeButton">Checkout</button>
        </a>

        </div>
    );
}

export default EntreeItems;
