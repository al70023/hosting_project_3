import React from 'react';
import { useState, useEffect, Fragment } from 'react';

function MenuItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [menuItemData, setMenuItemsData] = useState([]);

    // Data state variable for the data from the add menu item form
    const [addFormData, setAddFormData] = useState({
        item_id: '',
        item_name: '',
        item_price: '',
        item_category: '',
    })

    const fetchMenuItems = () => {
        fetch('http://localhost:3000/MenuItems')
            .then(res => res.json())
            .then(json => setMenuItemsData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchMenuItems();
    }, []);

    return(
        <div className = "menuItems">
            <h1> Menu Items </h1>


            <div className = "menuItemTable">
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
                        
                    </tbody>
                </table>
                </form>
                        
                

            </div>
        

            
        </div>
    );

}

export default MenuItems;