import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import {Link} from 'react-router-dom';
import InventoryReadOnlyRow from './inventoryComponents/InventoryReadOnlyRow';
import InventoryEditableRow from './inventoryComponents/InventoryEditableRow';
import './Inventory.css';

function Inventory() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [inventoryData, setInventoryData] = useState([]);

    // ADDING A NEW INVENTORY ITEM
    // Data state variable for the data from the add inventory form
    const [addFormData, setAddFormData] = useState({
        inventory_name: '',
        start_quantity: '',
        current_quantity: '',
        spoil_date: '',
        received_date: '',
        stored_location: ''
    })

    // Handling adding a new inventory into form
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

    // Handling when a user clicks the Add a New Inventory button
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new inventory instance
        const newInventory = {
            inventory_name: addFormData.inventory_name,
            start_quantity: addFormData.start_quantity,
            current_quantity: addFormData.current_quantity,
            spoil_date: addFormData.spoil_date,
            received_date: addFormData.received_date,
            stored_location: addFormData.stored_location
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newInventory)          // body = info for the inventory to add (from newInventory instance)
        }

        // Add the new inventory into the table
        fetch('http://localhost:3001/inventory/insert', requestOptions)
            .then(res => res.json())
            .then(window.location.reload('false'));             //Reload the page with the new inventory added to the table
    }


    // EDITING AN INVENTORY ITEM
    // New form to update the inventory row
    const [editFormData, setEditFormData] = useState({
        inventory_id: '',
        inventory_name: '',
        start_quantity: '',
        current_quantity: '',
        spoil_date: '',
        received_date: '',
        stored_location: ''
    })    

    // Allows for edited inventory to be updated live
    const [editInventoryID, setEditInventoryID] = useState(null);

    // Handles when the user edits/updates an inventory item
    const handleEditFormChange = (event) => {
        event.preventDefault();

        // Will get the name attribute for each of the inputs in the form and assign it to fieldName
        const fieldName = event.target.getAttribute('name');

        // Will get the actual value that the user inputted
        const fieldValue = event.target.value;

        // Make a copy of the form data
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    // Takes in inventory as a parameter so that we can save the specific row id for that item
    const handleEditClick = (event, inventory) => {
        event.preventDefault();
        setEditInventoryID(inventory.inventory_id);

        // Gets the new form values for a piece of edited item
        const formValues = {
            inventory_id: inventory.inventory_id,
            inventory_name: inventory.inventory_name,
            start_quantity: inventory.start_quantity,
            current_quantity: inventory.current_quantity,
            spoil_date: inventory.spoil_date,
            received_date: inventory.received_date,
            stored_location: inventory.stored_location
        }

        setEditFormData(formValues);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new item instance
        const editedInventory = {
            inventory_id: editFormData.inventory_id,
            inventory_name: editFormData.inventory_name,
            start_quantity: editFormData.start_quantity,
            current_quantity: editFormData.current_quantity,
            spoil_date: editFormData.spoil_date,
            received_date: editFormData.received_date,
            stored_location: editFormData.stored_location
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedInventory)          // body = info for new inventory
        }

        fetch('http://localhost:3001/inventory/update', requestOptions)
            .then(res => res.json())
            .then(window.location.reload('false'));             //Reload the page with the updated inventory
    }

    const handleCancelClick = () => {
        setEditInventoryID(null);
    }

    // DELETING AN INVENTORY ITEM
    const handleDeleteClick = (inventory_id) => {
        //DELETE request using fetch with error handling
        fetch(`http://localhost:3001/inventory/${inventory_id}`, { method: 'DELETE' })
            //.then(window.location.reload(false))
            .catch(error => {
                console.error('There was an error!', error);
        });

        const newInventory = [...inventoryData];
        const index = inventoryData.findIndex((inventory) => inventory.inventory_id === inventory_id);

        newInventory.splice(index, 1);

        setInventoryData(newInventory);
    }

    // VIEWING ALL INVENTORY
    const fetchInventory = () => {
        fetch('http://localhost:3001/Inventory')
        .then(res => res.json())
        .then(json => setInventoryData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchInventory();
    }, []);

    return(
        <div className = "inventory">
            <button className = "btnInventory">Inventory</button>

            <div>
            <Link activeClassName="active" to={'/ManagerHome'}>
            <a>
                <button className = "backButton"> Back</button>
            </a>
            </Link>
            </div>

            <div className = "inventoryTable">
                <form onSubmit={handleAddFormSubmit}>
                    <input 
                        class="border-gray border-2"
                        type="text"
                        name="inventory_name"
                        required="required"
                        placeholder="Enter item name..."
                        onChange={handleAddFormChange}
                    />
                    <input 
                        class="border-gray border-2"
                        type="number"
                        name="start_quantity"
                        required="required"
                        placeholder="Enter start quantity..."
                        onChange={handleAddFormChange}
                    />
                    <input 
                        class="border-gray border-2"
                        type="number"
                        name="current_quantity"
                        required="required"
                        placeholder="Enter curent quantity..."
                        onChange={handleAddFormChange}
                    />
                    <input 
                        class="border-gray border-2"
                        type="text"
                        name="spoil_date"
                        required="required"
                        placeholder="Enter spoil date..."
                        onChange={handleAddFormChange}
                    />
                    <input 
                        class="border-gray border-2"
                        type="text"
                        name="received_date"
                        required="required"
                        placeholder="Enter received date..."
                        onChange={handleAddFormChange}
                    />
                    <input 
                        class="border-gray border-2"
                        type="text"
                        name="stored_location"
                        required="required"
                        placeholder="Enter stored location..."
                        onChange={handleAddFormChange}
                    />
                    <button type="submit" class="addInventoryButton">Add New Inventory</button>
                </form>

                <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            {/* Table Column Headers */}
                            <th className="idCol">ID</th>
                            <th>Name</th> 
                            <th>Start Quantity</th>
                            <th>Current Quantity</th>
                            <th>Spoil Date</th>
                            <th>Received Date</th>
                            <th>Stored Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.map((inventory) => (
                            <Fragment>
                                {editInventoryID === inventory.inventory_id ? (
                                    <InventoryEditableRow
                                        inventory={inventory}
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange} 
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <InventoryReadOnlyRow inventory={inventory} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
                </form>
                        
                

            </div>
        

            
        </div>
    );

}

export default Inventory;