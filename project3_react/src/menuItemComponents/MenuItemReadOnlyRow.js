import React from 'react'

const MenuItemReadOnlyRow = ({ menuItem, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{menuItem.item_id}</td>
            <td>{menuItem.item_name}</td>
            <td>{menuItem.item_price}</td>
            <td>{menuItem.item_category}</td>
            <td>
                <button type="button" class="editMenuItemButton" onClick={(event) => handleEditClick(event, menuItem)}>Edit</button>
            </td>

            { <td>
                <button type="button" class="deleteMenuItemButton" onClick={() => handleDeleteClick(menuItem.item_id)}>Delete</button>
            </td> }
        </tr>
    )
}

export default MenuItemReadOnlyRow