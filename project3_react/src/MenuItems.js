import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import {Link} from 'react-router-dom';
import MenuItemReadOnlyRow from './menuItemComponents/MenuItemReadOnlyRow';
import MenuItemEditableRow from './menuItemComponents/MenuItemEditableRow';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import './MenuItems.css';

const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
};

function MenuItems() {

    // Data state variable defaulted to an empty array (for printing out the data)
    const [menuItemsData, setMenuItemsData] = useState([]);

    // Data state variable defaulted to an empty array (for printing out the data)
    const [inventoryData, setInventoryData] = useState([]);

    // Select inventory items from dropdown
    const [selectedOption, setSelectedOption] = useState([]);

    const fetchInventory = () => {
        fetch('https://node-deployment-jaq0.onrender.com/Inventory')
        .then(res => res.json())
        .then(json => setInventoryData(json))
    }

    useEffect(() => {
        fetchInventory();
    }, []);

    var inventoryDropdownItems = [];

    for (var i = 0; i < inventoryData.length; i++) {
        inventoryDropdownItems.push(inventoryData[i]);
        inventoryDropdownItems[i].value = inventoryDropdownItems[i].inventory_id;
        inventoryDropdownItems[i].label = inventoryDropdownItems[i].inventory_name;
    }

    const handleDropdownChange = (selected) => {
        setSelectedOption(selected);
    };

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
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    // Handling when a user clicks the Add a New Menu Item button
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new menu item instance
        const newMenuItem = {
            item_name: addFormData.item_name,
            item_price: addFormData.item_price,
            item_category: addFormData.item_category,
            linked_inventory: selectedOption
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newMenuItem)          // body = info for the menu item to add (from newMenuItem instance)
        }

        // Add the new menu item into the table
        fetch('https://node-deployment-jaq0.onrender.com/menuItems/insert', requestOptions)
            .then(res => res.json())
            .then(window.location.reload('false'));             //Reload the page with the new menu item added to the table
    }


    // EDITING A MENU ITEM
    // New form to update the menu item row
    const [editFormData, setEditFormData] = useState({
        item_id: '',
        item_name: '',
        item_price: '',
        item_category: ''
    })    

    // Allows for edited menu item to be updated live
    const [editMenuItemID, setEditMenuItemID] = useState(null);

    // Handles when the user edits/updates a menu item
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

    // Takes in menu item as a parameter so that we can save the specific row id for that item
    const handleEditClick = (event, menuItem) => {
        event.preventDefault();
        setEditMenuItemID(menuItem.item_id);

        // Gets the new form values for a piece of edited item
        const formValues = {
            item_id: menuItem.item_id,
            item_name: menuItem.item_name,
            item_price: menuItem.item_price,
            item_category: menuItem.item_category
        }

        setEditFormData(formValues);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new item instance
        const editedMenuItem = {
            item_id: editFormData.item_id,
            item_name: editFormData.item_name,
            item_price: editFormData.item_price,
            item_category: editFormData.item_category
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedMenuItem)          // body = info for new menu item
        }

        fetch('https://node-deployment-jaq0.onrender.com/menuItems/update', requestOptions)
            .then(res => res.json())
            .then(window.location.reload('false'));             //Reload the page with the updated menu item
    }

    const handleCancelClick = () => {
        setEditMenuItemID(null);
    }

    // DELETING A MENU ITEM
    const handleDeleteClick = (item_id) => {
        //DELETE request using fetch with error handling
        fetch(`https://node-deployment-jaq0.onrender.com/menuItems/${item_id}`, { method: 'DELETE' })
            .then(window.location.reload(false))
            .catch(error => {
                console.error('There was an error!', error);
        });

        // const newMenuItems = [...menuItemsData];
        // const index = menuItemsData.findIndex((menuItem) => menuItem.item_id === item_id);

        // newMenuItems.splice(index, 1);

        // setMenuItemsData(newMenuItems);
    }

    // VIEWING ALL MENU ITEMS
    const fetchMenuItems = () => {
        fetch('https://node-deployment-jaq0.onrender.com/MenuItems', {mode: 'cors'})
        .then(res => res.json())
        .then(json => setMenuItemsData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchMenuItems();
    }, []);

    return(
        <div className = "menuItems">
            <button className = "btnMenuItems">Menu Items</button>
            
            <div>
            <Link activeClassName="active" to={'/ManagerHome'}>
            <button className = "backMenuItemsButton"> Back</button>
            </Link>
            </div>

            <div className = "menuItemTable">
                <form onSubmit={handleAddFormSubmit}>
                    <input 
                        class="border-gray border-2"
                        type="text"
                        name="item_name"
                        required="required"
                        placeholder="Enter item name..."
                        onChange={handleAddFormChange}
                    />
                    <input 
                        class="border-gray border-2"
                        type="number"
                        step="0.01"
                        name="item_price"
                        required="required"
                        placeholder="Enter item price..."
                        onChange={handleAddFormChange}
                    />
                    <input 
                        class="border-gray border-2"
                        type="text"
                        name="item_category"
                        required="required"
                        placeholder="Enter item category..."
                        onChange={handleAddFormChange}
                    />
                    <div class="dropdown">
                        <ReactSelect 
                            options={inventoryDropdownItems}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{Option}}
                            onChange={handleDropdownChange}
                            allowSelectAll={true}
                            value={selectedOption}
                        />
                    </div>
                    <button type="submit" class="addMenuItemButton">Add New Menu Item</button>
                </form>

                <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            {/* Table Column Headers */}
                            <th className="idCol">ID</th>
                            <th>Name</th> 
                            <th>Price</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItemsData.map((menuItem) => (
                            <Fragment>
                                {editMenuItemID === menuItem.item_id ? (
                                    <MenuItemEditableRow
                                        menuItem={menuItem}
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange} 
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <MenuItemReadOnlyRow menuItem={menuItem} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
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

export default MenuItems;
