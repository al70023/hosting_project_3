//const { setRandomFallback } = require('bcryptjs');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

const viewMenuItems = (req, res) => {
    pool.query('SELECT * FROM menu_items ORDER BY item_id', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const insertMenuItem = (req, res) => {
    const {item_name, item_price, item_category, linked_inventory} = req.body

    pool.query('INSERT INTO menu_items (item_name, item_price, item_category) VALUES($1, $2, $3)', 
    [item_name, item_price, item_category], (error, results) => {
        if (error) {
            throw error
        }
    })

    pool.query('SELECT item_id FROM menu_items WHERE item_name=$1', [item_name], (error, results) => {
        if (error) {
            throw error
        }
        const item_id = results.rows[0]["item_id"];
        for (var i = 0; i < linked_inventory.length; i++) {
            pool.query('INSERT INTO menu_items_have_inventory(item_id, inventory_id) VALUES($1, $2)', 
            [item_id, linked_inventory[i].inventory_id], (error, results) => {
                if (error) {
                    throw error
                }
            })
        }
    })

}

const updateMenuItem = (req, res) => {
    const {item_id, item_name, item_price, item_category} = req.body

    pool.query('UPDATE menu_items SET item_name=$1, item_price=$2, item_category=$3 WHERE item_id = $4', 
    [item_name, item_price, item_category, item_id], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const deleteMenuItem = (req, res) => {
    //const {item_id} = req.body

    const item_id = parseInt(req.params.item_id)

    pool.query('DELETE FROM menu_items_have_inventory WHERE item_id = $1',
    [item_id], (error, results) => {
        if (error) {
            throw error
        }
    })

    pool.query('DELETE FROM menu_items WHERE item_id = $1',
    [item_id], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const viewInventory = (req, res) => {
    pool.query('SELECT * FROM inventory ORDER BY inventory_id', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const insertInventory = (req, res) => {
    const {inventory_name, start_quantity, current_quantity, spoil_date, received_date, stored_location} = req.body

    pool.query('INSERT INTO inventory (inventory_name, start_quantity, current_quantity, spoil_date, received_date, stored_location) VALUES($1, $2, $3)', 
    [inventory_name, start_quantity, current_quantity, spoil_date, received_date, stored_location], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const updateInventory = (req, res) => {
    const {inventory_id, inventory_name, start_quantity, current_quantity, spoil_date, received_date, stored_location} = req.body

    pool.query('UPDATE inventory SET inventory_name=$1, start_quantity=$2, current_quantity=$3, spoil_date=$4, received_date=$5, stored_location=$6 WHERE inventory_id = $7', 
    [inventory_name, start_quantity, current_quantity, spoil_date, received_date, stored_location, inventory_id], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const deleteInventory = (req, res) => {
    //const {inventory_id} = req.body

    const inventory_id = parseInt(req.params.inventory_id)

    pool.query('DELETE FROM menu_items_have_inventory WHERE inventory_id = $1',
    [inventory_id], (error, results) => {
        if (error) {
            throw error
        }
    })


    pool.query('DELETE FROM inventory WHERE inventory_id = $1',
    [inventory_id], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const viewRestockReport = (req, res) => {
    pool.query('SELECT * FROM inventory WHERE current_quantity < start_quantity / 10 ORDER BY inventory_id' , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}
const Restock = (req, res) => {
    pool.query('Update inventory SET current_quantity = start_quantity' , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const viewSalesReport = (req, res) => {
    const {start_date, end_date} = req.body
    
    const string1 = new String(start_date);
    const string2 = new String(end_date);
    if(string1.length != 16 || string2.length != 16){
        console.log(string1);
        console.log(string1.length);
        return;
    }
    pool.query("SELECT * FROM orders WHERE time between $1 and $2 ORDER BY time" , [start_date, end_date], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const viewEmployeeReport = (req, res) => {

    pool.query("select DISTINCT employees.employee_id, employees.employee_name, sum(total_cost) over (PARTITION BY orders.employee_id) from orders, employees where employees.employee_id = orders.employee_id order by sum DESC;", (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const viewExcessReport = (req, res) => {
    const {date} = req.body
    pool.query("select * from inventory where current_quantity>0.9*start_quantity AND received_date<'10/03/22'", (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}



module.exports = {
    viewMenuItems,
    insertMenuItem,
    updateMenuItem,
    deleteMenuItem,
    viewInventory,
    insertInventory,
    updateInventory,
    deleteInventory,
    viewRestockReport,
    Restock,
    viewSalesReport,
    viewEmployeeReport,
    viewExcessReport
} 