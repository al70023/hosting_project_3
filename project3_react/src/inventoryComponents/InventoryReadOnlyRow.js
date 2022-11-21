import React from 'react'

const InventoryReadOnlyRow = ({ inventory, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{inventory.inventory_id}</td>
            <td>{inventory.inventory_name}</td>
            <td>{inventory.start_quantity}</td>
            <td>{inventory.current_quantity}</td>
            <td>{inventory.spoil_date}</td>
            <td>{inventory.received_date}</td>
            <td>{inventory.stored_location}</td>
            <td>
                <button type="button" class="editButton" onClick={(event) => handleEditClick(event, inventory)}>Edit</button>
            </td>

            { <td>
                <button type="button" class="deleteButton" onClick={() => handleDeleteClick(inventory.item_id)}>Delete</button>
            </td> }
        </tr>
    )
}

export default InventoryReadOnlyRow