import React from 'react'

// This is for an editable row (what the row displays after a user clicks Update)
const InventoryEditableRow = ({ inventory, editFormData, handleEditFormChange, handleCancelClick}) => {
    return (
        <tr>
            {/* inventory_id --- CANNOT EDIT THIS SO NO INPUT LINE */}
            <td>
                {inventory.inventory_id}
            </td>

            {/* item name */}
            <td>
                <input 
                    class="border-gray border-2 text-center"
                    type="text"
                    name="inventory_name"
                    required="required"
                    placeholder="Enter inventory name..."
                    
                    value={editFormData.inventory_name}
                    onChange={handleEditFormChange}
                />
            </td>
                
            {/* start quantity */}
            <td>
                <input 
                    class="border-gray border-2 text-center"
                    type="number"
                    name="start_quantity"
                    required="required"
                    placeholder="Enter start_quantity..."
                    value={editFormData.start_quantity}
                    onChange={handleEditFormChange}
                />
            </td>

             {/* current quantity */}
             <td>
                <input 
                    class="border-gray border-2 text-center"
                    type="number"
                    name="current_quantity"
                    required="required"
                    placeholder="Enter current_quantity..."
                    value={editFormData.current_quantity}
                    onChange={handleEditFormChange}
                />
            </td>

            {/* spoil date */}
            <td>
                <input 
                    class="border-gray border-2 text-center"
                    type="text"
                    name="spoil_date"
                    required="required"
                    placeholder="Enter spoil date..."
                    value={editFormData.spoil_date}
                    onChange={handleEditFormChange}
                />
            </td>

            {/* received date */}
            <td>
                <input 
                    class="border-gray border-2 text-center"
                    type="text"
                    name="received_date"
                    required="required"
                    placeholder="Enter received date..."
                    value={editFormData.received_date}
                    onChange={handleEditFormChange}
                />
            </td>

            {/* stored location*/}
            <td>
                <input 
                    class="border-gray border-2 text-center"
                    type="text"
                    name="stored_location"
                    required="required"
                    placeholder="Enter stored location..."
                    value={editFormData.stored_location}
                    onChange={handleEditFormChange}
                />
            </td>

            <td>
                <button type="submit" class="saveButton">Save</button>
                <button type="submit" class="deleteButton" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default InventoryEditableRow