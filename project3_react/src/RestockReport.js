import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import {Link} from 'react-router-dom';
import './RestockReport.css';

function RestockReport() {

    const [restockItemsData, setRestockItemsData] = useState([]);
    const [addFormData, setAddFormData] = useState({
        Item: '',
        Amount: ''
    })

    const fetchRestockItems = () => {
        fetch('https://node-deployment-jaq0.onrender.com/RestockReport')
            .then(res => res.json())
            .then(json => setRestockItemsData(json))
    }

    useEffect(() => {
        fetchRestockItems();
    }, []);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        // Will get the name attribute for each of the inputs in the form and assign it to fieldName
        const fieldName = event.target.getAttribute('name');
        
        // Will get the actual value that the user inputted
        const fieldValue = event.target.value;

        // Make a copy of the form data
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }


    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new period instance
        const newRestock = {
            Item: 'NA',
            Amount: 'NA'
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newRestock)  
        }

        // Add the new inventory into the table
        fetch('https://node-deployment-jaq0.onrender.com/RestockReport/Restock', requestOptions)
            .then(res => res.json())
            .then(json => setRestockItemsData(json))
            .then(window.location.reload());

    }

    const handleAddFormSubmit2 = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new period instance
        const newRestock = {
            Item: addFormData.Item_name,
            Amount: addFormData.Restock_amount
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newRestock)
        }

        // Add the new inventory into the table
        fetch('https://node-deployment-jaq0.onrender.com/RestockReport/Restock', requestOptions)
            .then(res => res.json())
            .then(json => setRestockItemsData(json))
            .then(window.location.reload());

    }

    return (
        <div className="">


            <button className = "btnRestock">Restock</button>
            <form onSubmit={handleAddFormSubmit}>
                
                <button type="submit" class="btnRestockItems">Restock All Items</button>
                
            </form>

            <form class="mt-8" onSubmit={handleAddFormSubmit2}>
                    <input 
                        class="border-gray border-2 w-60"
                        type="text"
                        name="Item_name"
                        required="required"
                        placeholder="Item name"
                        onChange={handleAddFormChange}
                    />
                    <input 
                        class="border-gray border-2 w-60"
                        type="number"
                        name="Restock_amount"
                        required="required"
                        placeholder="Amount"
                        onChange={handleAddFormChange}
                    />
                    
                    <button type="submit" className="addInventoryButton">Restock Item</button>
                </form>

            <div>
            <Link activeClassName="active" to={'/ManagerHome'}>
            <a>
                <button className = "backRestockButton">Back</button>
            </a>
            </Link>
            </div>

            <br></br>

            <div class="w-full bg-blue-100">
                <form>
                    <table className='RestockItemTable' class="table-auto w-full shadow-md rounded border-separate border-spacing-y-4">
                        <thead>
                            <tr>
                                {/* Table Column Headers */}
                                <th>Name</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {restockItemsData.map((restockItem) => (  
                                <tr>
                                    <td name="name">{restockItem.inventory_name}</td>
                                    <td name="quantity">{restockItem.current_quantity}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>



            </div>

            

        </div>
    );
}

export default RestockReport;










