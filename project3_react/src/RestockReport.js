import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import './RestockReport.css';

function RestockReport() {

    const [restockItemsData, setRestockItemsData] = useState([]);

    const fetchRestockItems = () => {
        fetch('http://localhost:3001/RestockReport')
            .then(res => res.json())
            .then(json => setRestockItemsData(json))
    }

    useEffect(() => {
        fetchRestockItems();
    }, []);

    return (
        <div className="">
            <h1 class="text-xl"> Restock Items </h1>
            

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










