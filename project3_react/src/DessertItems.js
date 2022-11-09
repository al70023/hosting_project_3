import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import './DessertItems.css';

function DessertItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [dessertItemsData, setDessertItemsData] = useState([]);

    // Data state variable for the data from the add dessert item form
    const [addFormData, setAddFormData] = useState({
        item_name: '',
        item_price: '',
    })

    const [editDessertItemID, setEditDessertItemID] = useState(null);

    const fetchDessertItems = () => {
        fetch('http://localhost:3001/DessertItems')
        .then(res => res.json())
        .then(json => setDessertItemsData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchDessertItems();
    }, []);

    console.log(dessertItemsData);
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
                                <td><button>Add Item</button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                </form>
                        
                

            </div>
        

            
        </div>
    );

}

export default DessertItems;