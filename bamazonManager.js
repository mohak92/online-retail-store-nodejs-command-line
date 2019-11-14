var inquirer = require("inquirer");
var mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "YOUR_MySQL_DB_PASSWORD",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    start();
});

async function start() {
    inquirer
        .prompt({
            name: "addNewOrUpdateInventory",
            type: "list",
            message: "Would you like to [List all products] or [Add new product]  or [Update quantites of existing products] or [List products with low inventory] in the database or EXIT ?",
            choices: ["List all products", "Add new product", "Update quantites of existing products", "List products with low inventory", "EXIT"]
        })
        .then(async function (answer) {
            if (answer.addNewOrUpdateInventory === "List all products") {
                await listAllProducts();
                console.log("\n");
            } else if (answer.addNewOrUpdateInventory === "Add new product") {
                addNewProduct();
            } else if (answer.addNewOrUpdateInventory === "Update quantites of existing products") {
                addQuantities();
            } else if (answer.addNewOrUpdateInventory === "List products with low inventory") {
                lowInStock();
            } else {
                connection.end();
            }
        });
}

async function listAllProducts() {
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", async function (err, response) {
        if (err) throw err;
        console.table(response);
        start();
    });
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "Enter the product name ?"
        },
        {
            name: "department_name",
            type: "input",
            message: "Enter the department name ?"
        },
        {
            name: "price",
            type: "input",
            message: "Enter the price for this product ?"
        },
        {
            name: "quantity",
            type: "input",
            message: "Input number of quantity in stock for product ?"
        }]).then(function (response) {
            var product_name = response.product_name;
            var department_name = response.department_name;
            var price = parseInt(response.price);
            var stock_qunatity = parseInt(response.quantity);
            connection.query("INSERT INTO products SET ?, ?, ?, ? ", [{ product_name: product_name },
            { department_name: department_name },
            { price: price },
            { stock_quantity: stock_qunatity }], async function (err, response) {
                if (err) throw err;
                console.log("\nNew Product added.")
                listAllProducts();
            });
        });
}

function addQuantities() {
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", async function (err, response) {
        if (err) throw err;
        console.table(response);
        updateStock();
    });
}

function updateStock() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Enter the item_id for the product you would like to update stock ?"
        },
        {
            name: "quantity",
            type: "input",
            message: "Input number of quantity for product ?"
        }]).then(function (response) {
            var item_id = parseInt(response.item_id);
            var quantity = parseInt(response.quantity);
            connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: quantity }, { item_id: item_id }], async function (err, response) {
                if (err) throw err;
                console.log("\nStock updated")
                listAllProducts();
            });
        });
}

function lowInStock() {
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity < 100", async function (err, response) {
        if (err) throw err;
        console.log("\nProducts low in stock")
        console.table(response);
        start();
    });
}

