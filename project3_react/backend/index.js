const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const dbServer = require("./serverBackend")
const dbManager = require("./managerBackend");
const { Pool } = require('pg/lib');
const app = express()
//const PORT = 3001
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("server has started on port", PORT);
});

// var corsOptions = {
//   origin: "http://localhost:3000"
// }

//app.use(cors(corsOptions))
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// Routes for Menu Items
/**
 * Route for getting all the menu items
 * @name ViewMenuItems
 * @function 
 */
app.get('/MenuItems', dbManager.viewMenuItems)

/**
 * Route for inserting a new menu item
 * @name InsertMenuItem
 * @function 
 * @param {string} name
 * @param {double} price
 * @param {string} category
 * @param {array} associateInventory
 */
app.post('/menuItems/insert', dbManager.insertMenuItem)

/**
 * Route for updating an existing menu item
 * @name UpdateMenuItem
 * @function 
 * @param {string} name
 * @param {double} price
 * @param {string} category
 * @param {array} associateInventory
 */
app.post('/menuItems/update', dbManager.updateMenuItem)

/**
 * Route for deleting an existing menu item
 * @name DeleteMenuItem
 * @function 
 * @param {integer} id
 */
app.delete('/menuItems/:item_id', dbManager.deleteMenuItem)

// Routes for Inventory
/**
 * Route for getting all the inventory
 * @name ViewInventory
 * @function 
 */
app.get('/Inventory', dbManager.viewInventory)

/**
 * Route for inserting a new inventory item
 * @name InsertInventory
 * @function 
 * @param {string} name
 * @param {integer} startQuantity
 * @param {integer} currentQuantity
 * @param {date} spoilDate
 * @param {date} receivedDate
 * @param {string} storageLocation
 */
app.post('/inventory/insert', dbManager.insertInventory)

/**
 * Route for updating an existing inventory item
 * @name UpdateInventory
 * @function 
 * @param {string} name
 * @param {integer} startQuantity
 * @param {integer} currentQuantity
 * @param {date} spoilDate
 * @param {date} receivedDate
 * @param {string} storageLocation
 */
app.post('/inventory/update', dbManager.updateInventory)

/**
 * Route for deleting an existing inventory item
 * @name DeleteInventoryItem
 * @function 
 * @param {integer} id
 */
app.delete('/inventory/:inventory_id', dbManager.deleteInventory)


// Routes for Server/Customer GUI
/**
 * Route for getting all the entrees
 * @name ViewEntrees
 * @function 
 */
app.get('/EntreeItems', dbServer.viewEntreeItems)

/**
 * Route for getting all the sides
 * @name ViewSides
 * @function 
 */
app.get('/SideItems', dbServer.viewSideItems)

/**
 * Route for getting all the drinks
 * @name ViewDrinks
 * @function 
 */
app.get('/DrinkItems', dbServer.viewDrinkItems)

/**
 * Route for getting all the desserts
 * @name ViewDesserts
 * @function 
 */
app.get('/DessertItems', dbServer.viewDessertItems)
app.get('/OrderSummary', dbServer.viewOrderSummary)
app.post('/orderSummary/insert', dbServer.insertOrder)
app.post('/employeeLogin/info', dbServer.employeeLogin)

//Routes for reports
app.get('/RestockReport', dbManager.viewRestockReport)
app.post('/RestockReport/Restock', dbManager.Restock)
app.post('/SalesReport', dbManager.viewSalesReport)
app.get('/EmployeeReport', dbManager.viewEmployeeReport)
app.post('/ExcessReport', dbManager.viewExcessReport)
