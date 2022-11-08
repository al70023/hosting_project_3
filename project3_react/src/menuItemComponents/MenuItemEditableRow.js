import React from 'react'

// This is for an editable row (what the row displays after a user clicks Update)
const MenuItemEditableRow = ({ menuItem, editFormData, handleEditFormChange}) => {
    return (
        <tr>
            {/* item_id --- CANNOT EDIT THIS SO NO INPUT LINE */}
            <td>
                {menuItem.item_id}
            </td>

            {/* item name */}
            <td>
                <input 
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
                    type="text"
                    name="item_category"
                    required="required"
                    placeholder="Enter item category..."
                    value={editFormData.item_category}
                    onChange={handleEditFormChange}
                />
            </td>

            <td>
                <button type="submit">Save</button>
            </td>
        </tr>
    )
}

export default MenuItemEditableRow