import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import './SideItems.css';

function SideItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [sideItemsData, setSideItemsData] = useState([]);

    // Data state variable for the data from the add side item form
    const [addFormData, setAddFormData] = useState({
        item_name: '',
        item_price: '',
    })

    const [editSideItemID, setEditSideItemID] = useState(null);

    const fetchSideItems = () => {
        fetch('http://localhost:3001/SideItems')
        .then(res => res.json())
        .then(json => setSideItemsData(json))
    }
    
    // Call the function on the component mount
    useEffect(() => {
        fetchSideItems();
    }, []);

    console.log(sideItemsData);
    return(
        <div className = "sideItems">
            <h1> Side Items </h1>


            <div className = "sideItemTable">
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
                        {sideItemsData.map((sideItem) => (
                            <tr>
                                <td>{sideItem.item_name}</td>
                                <td>{sideItem.item_price}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                </form>
                        
                

            </div>
        

            
        </div>
    );

}

export default SideItems;