const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const dbServer = require("./serverBackend")
const dbManager = require("./managerBackend")
const app = express()
const PORT = 3000

// Add process hook to shutdown pool
process.on('SIGINT', function() {
  pool.end();
  console.log('Application successfully shutdown');
  process.exit(0);
});

var corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/MenuItems', dbManager.viewMenuItems)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});