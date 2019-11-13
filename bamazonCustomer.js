var inquirer = require("inquirer");
var mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "YOUR_MySQL_PASSWORD_GOES_HERE",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    listAllProducts();
});

function listAllProducts() {
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, response) {
        if (err) throw err;
        console.table(response);
        shopProducts();
    });
}

function shopProducts() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Enter the item_id for the product you would like to purchase ?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase ?"
        }]).then(function (response) {
            var item_id = parseInt(response.item_id);
            var quantity = parseInt(response.quantity);
            var total;
            var updateQuantity;

            connection.query("SELECT * FROM products WHERE ?", { item_id: item_id }, function (err, response) {
                if (err) throw err;
                if (quantity > response[0].stock_quantity) {
                    console.log("\nInsufficient Quantity!")
                } else {
                    total = quantity * response[0].price;
                    updateQuantity = response[0].stock_quantity - quantity;
                    console.log("\nYou purchased " + quantity + " " + response[0].product_name + "\n\nYour total is: $" + total);
                    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: updateQuantity }, { item_id: item_id }], function (err, response) {
                        if (err) throw err;
                        console.log("\nInventory Updated")
                    })
                }
                connection.end();
            })
        })
}
