import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import './EntreeItems.css';

function EntreeItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [entreeItemsData, setEntreeItemsData] = useState([]);

    // Data state variable for the data from the add entree item form
    const [addFormData, setAddFormData] = useState({
        item_name: '',
        item_price: '',
    })

    const [editEntreeItemID, setEditEntreeItemID] = useState(null);

    const fetchEntreeItems = () => {
        fetch('http://localhost:3001/EntreeItems')
        .then(res => res.json())
        .then(json => setEntreeItemsData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchEntreeItems();
    }, []);

    console.log(entreeItemsData);
    return(
        <div className = "entreeItems">
            <h1> Entree Items </h1>


            <div className = "entreeItemTable">
                <form>
                <table>
                    <thead>
                        <tr>
                            {/* Table Column Headers */}
                            <th className="idCol">ID</th>
                            <th>Name</th> 
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entreeItemsData.map((entreeItem) => (
                            <tr>
                                <td>{entreeItem.item_name}</td>
                                <td>{entreeItem.item_price}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                </form>
                        
                

            </div>
        

            
        </div>
    );

}

export default EntreeItems;