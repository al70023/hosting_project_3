import React from 'react';
import { useState, useEffect, Fragment } from 'react';

import './MenuItems.css';

function MenuItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [menuItemsData, setMenuItemsData] = useState([]);

    // ADDING A NEW MENU ITEM
    // Data state variable for the data from the add menu item form
    const [addFormData, setAddFormData] = useState({
        item_name: '',
        item_price: '',
        item_category: '',
    })

    // Handling adding a new menu item into form
    const handleAddFormChange = (event) => {
        event.preventDefault();

        // Will get the name attribute for each of the inputs in the form and assign it to fieldName
        const fieldName = event.target.getAttribute('name');
        
        // Will get the actual value that the user inputted
        const fieldValue = event.target.value;

        // Make a copy of the form data
        const newFormData = {... addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    // Handling when a user clicks the Add a New Menu Item button
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new equipment instance
        const newMenuItem = {
            item_name: addFormData.item_name,
            item_price: addFormData.item_price,
            item_category: addFormData.item_category
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newMenuItem)          // body = info for the menu item to add (from newMenuItem instance)
        }

        // Add the new menu item into the table
        fetch('http://localhost:3001/menuItems/insert', requestOptions)
            .then(res => res.json())
            .then(window.location.reload('false'));             //Reload the page with the new menu item added to the table
    }




    

    const [editMenuItemID, setEditMenuItemID] = useState(null);

    const fetchMenuItems = () => {
        fetch('http://localhost:3001/MenuItems')
        .then(res => res.json())
        .then(json => setMenuItemsData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchMenuItems();
    }, []);

    console.log(menuItemsData);
    return(
        <div className = "menuItems">
            <h1> Menu Items </h1>

            

            <div className = "menuItemTable">
                <h2>Add a New Menu Item</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input 
                        type="text"
                        name="item_name"
                        required="required"
                        placeholder="Enter item name..."
                        onChange={handleAddFormChange}
                    />
                    <input 
                        type="number"
                        step="0.01"
                        name="item_price"
                        required="required"
                        placeholder="Enter item price..."
                        onChange={handleAddFormChange}
                    />
                    <input 
                        type="text"
                        name="item_category"
                        required="required"
                        placeholder="Enter item category..."
                        onChange={handleAddFormChange}
                    />
                    <button type="submit">Add New Menu Item</button>
                </form>

                <form>
                <table>
                    <thead>
                        <tr>
                            {/* Table Column Headers */}
                            <th className="idCol">ID</th>
                            <th>Name</th> 
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItemsData.map((menuItem) => (
                            <tr>
                                <td>{menuItem.item_id}</td>
                                <td>{menuItem.item_name}</td>
                                <td>{menuItem.item_price}</td>
                                <td>{menuItem.item_category}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                </form>
                        
                

            </div>
        

            
        </div>
    );

}

export default MenuItems;