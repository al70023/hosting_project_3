import React from 'react'

// This is for an editable row (what the row displays after a user clicks Update)
const MenuItemEditableRow = ({ menuItem, editFormData, handleEditFormChange, handleCancelClick}) => {
    return (
        <tr>
            {/* item_id --- CANNOT EDIT THIS SO NO INPUT LINE */}
            <td>
                {menuItem.item_id}
            </td>

            {/* item name */}
            <td>
                <input 
                    class="border-gray border-2 text-center"
                    type="text"
                    name="item_name"
                    required="required"
                    placeholder="Enter item name..."
                    
                    value={editFormData.item_name}
                    onChange={handleEditFormChange}
                />
            </td>
                
            {/* item price */}
            <td>
                <input 
                    class="border-gray border-2 text-center"
                    type="number"
                    name="item_price"
                    required="required"
                    placeholder="Enter item price..."
                    value={editFormData.item_price}
                    onChange={handleEditFormChange}
                />
            </td>

            {/* item category */}
            <td>
                <input 
                    class="border-gray border-2 text-center"
                    type="text"
                    name="item_category"
                    required="required"
                    placeholder="Enter item category..."
                    value={editFormData.item_category}
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

export default MenuItemEditableRow