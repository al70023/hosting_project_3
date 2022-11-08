import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import './DrinkItems.css';

function DrinkItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [drinkItemsData, setDrinkItemsData] = useState([]);

    // Data state variable for the data from the add drink item form
    const [addFormData, setAddFormData] = useState({
        item_name: '',
        item_price: '',
    })

    const [editDrinkItemID, setEditDrinkItemID] = useState(null);

    const fetchDrinkItems = () => {
        fetch('http://localhost:3001/DrinkItems')
        .then(res => res.json())
        .then(json => setDrinkItemsData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchDrinkItems();
    }, []);

    console.log(drinkItemsData);
    return(
        <div className = "drinkItems">
            <h1> Drink Items </h1>


            <div className = "drinkItemTable">
                <form>
                <table>
                    <thead>
                        <tr>
                            {/* Table Column Headers */}
                            <th>Name</th> 
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drinkItemsData.map((drinkItem) => (
                            <tr>
                                <td>{drinkItem.item_name}</td>
                                <td>{drinkItem.item_price}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                </form>
                        
                

            </div>
        

            
        </div>
    );

}

export default DrinkItems;