import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import './Checkout.css';


const Back = () => {
  let navigate = useNavigate();
  return (
      <>
        <button  className = "btnBackCheckout" onClick={() => navigate(-1)}>Back</button> 
      </>
  );
};

function Checkout() {

    const [items, setItemsOrdered] = useState(JSON.parse(sessionStorage.getItem("itemsOrderded")) || []);

    const [totalCost, setTotalCost] = useState(parseFloat(sessionStorage.getItem("orderCost")) || 0.00);

    // Data state variable for the data
    const [checkoutData, setCheckoutData] = useState({
        cust_name: '',
        credit_card_num: '',
    })
    const handleCheckoutFormChange = (event) => {
        event.preventDefault();

        // Will get the name attribute for each of the inputs in the form and assign it to fieldName
        const fieldName = event.target.getAttribute('name');
        
        // Will get the actual value that the user inputted
        const fieldValue = event.target.value;

        // Make a copy of the form data
        const newCheckoutData = {...checkoutData};
        newCheckoutData[fieldName] = fieldValue;

        setCheckoutData(newCheckoutData);
    }

    // Handling when a user clicks Submit Order
    const handleSubmitOrder = (event) => {
        event.preventDefault();

        var items = JSON.parse(sessionStorage.getItem("itemsOrdered"));
        var itemsIDs = [];
        var itemsString = "";

        var totalCost = parseFloat(sessionStorage.getItem("orderCost"));

        if (items === null) {
            alert("Failed to place order: No items in cart.");
            return;
        }

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

        var id = 5;
        if (JSON.parse(sessionStorage.getItem("employeeSession")) === null) {
          id = 5;
        } else {
          id = JSON.parse(sessionStorage.getItem("employeeSession")).employee_id;
        }

        if (checkoutData.cust_name === '') {
          checkoutData.cust_name = jwt_decode(sessionStorage.getItem("googleSession")).given_name;
        }

        // Assign the values from the order to a new order instance
        const newOrder = {
            time: currDate + " " + currTime, 
            cust_name: checkoutData.cust_name, 
            items_ordered: itemsIDs, 
            items_ordered_string: itemsString, 
            total_cost: totalCost, 
            credit_card_num: checkoutData.credit_card_num, 
            employee_id: id
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
    

    const containerStyle = {
        width: '1000px',
        height: '800px'
      };
      
      const center = {
        lat: 30.607,
        lng: -96.34
      };
      
      const store1 = {
        lat: 30.61232093072571, 
        lng: -96.34130677030306
      }
      
      const store2 = {
        lat: 30.61722541908507, 
        lng: -96.34418756933081
      }
      
      const store3 = {
        lat: 30.585563142372333, 
        lng: -96.32393623545724
      }
      
      const store4 = {
        lat: 30.63115416799953, 
        lng: -96.37920402164322
      }
      
      const store5 = {
        lat: 30.61651557337937, 
        lng: -96.31979326149934
      }
      
      const store6 = {
        lat: 30.659799446267183, 
        lng: -96.3309947426391 
      }
      
      const store7 = {
        lat: 30.562050900698093, 
        lng: -96.2589382151058
      }

      useEffect(() => {
        document.getElementById("mapDiv").hidden = true;
        document.getElementById("buttonDiv").hidden = false;
      }, []);
    

      function handleStoreLocator(event) {
        document.getElementById("buttonDiv").hidden = true;
        document.getElementById("mapDiv").hidden = false;
      }

    return (
        <div>
            <div class="CheckoutPage">

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
                <button className = "btnCheckoutItem">Checkout Page</button>
                <h1>Orders (Total is: {totalCost.toFixed(2)})</h1>
                <br></br>
                {JSON.parse(sessionStorage.getItem("itemsOrdered")) != null &&
                    <ol>
                        {JSON.parse(sessionStorage.getItem("itemsOrdered")).map((item) =>
                            <li>
                                {item.item_name}    {item.item_price}  <button className = "removeCheckoutButton" type="button" onClick={() => removeItem(item)}>Remove Item</button>
                                <p><br></br></p>
                            </li>
                        )}
                    </ol>}
                <p><br></br></p>
                <form onSubmit={handleSubmitOrder}>
                {sessionStorage.getItem("googleSession") != null ? 
                  (<input 
                  class="border-gray border-2"
                  type="text"
                  name="cust_name"
                  required="required"
                  onChange={handleCheckoutFormChange}
                  value={jwt_decode(sessionStorage.getItem("googleSession")).given_name}
                  />) : (<input 
                    class="border-gray border-2"
                    type="text"
                    name="cust_name"
                    required="required"
                    placeholder="Enter customer name..."
                    onChange={handleCheckoutFormChange}
                />)
                }
                    <input 
                        class="border-gray border-2"
                        type="text"
                        name="credit_card_num"
                        required="required"
                        placeholder="Enter credit card..."
                        onChange={handleCheckoutFormChange}
                    />
                    <br/>
                    <p><br></br></p>
                    <button className = "btnCheckoutSubmit" type="submit">Submit Order</button>
                </form>
            </div>

            <br/>
            <br/>
            <center>
            <div id="mapDiv">
            <LoadScript googleMapsApiKey="AIzaSyDJVa-4NwPfYayx3nuiMW5EMMP1-SXwmdU">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12.9}>
                    { /* Child components, such as markers, info windows, etc. */ }
                    <Marker position={store1} />
                    <Marker position={store2} />
                    <Marker position={store3} />
                    <Marker position={store4} />
                    <Marker position={store5} />
                    <Marker position={store6} />
                    <Marker position={store7} />
                </GoogleMap>
            </LoadScript>
            </div>
            <button className = "btnStoreLocator" id="buttonDiv" onClick={ (e) => handleStoreLocator(e)}>Store Locator</button>
            </center>
        </div>
    );
}

export default Checkout;