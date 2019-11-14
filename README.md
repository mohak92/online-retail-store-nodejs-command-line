# Online Retail Store

A Node.js command line Amazon-like storefront with the MySQL for database.
Performs all CRUD operations. The app will take in orders from customers and deplete stock from the store's inventory.

## Installation
Run the schema.sql from MySQL Shell of any MySQL GUI client to seed data into your MySQL database.

Configure your connection setting in the .js files for your MySQL database.
```js
const connection = mysql.createConnection({
    host: "localhost", //DB location
    port: 3306, //Port number
    user: "root", //MySQL Database username
    password: "YOUR_MySQL_PASSWORD_GOES_HERE", //Add your MySQL DB password here
    database: "bamazon" //Database name
});
```

Use the node package manager to install dependencies.

```bash
npm install 
```
#### Packages used:
1. inquirer
2. mysql

## How to Run:
![](assets/img/online-store.gif)
```bash
node bamazonCustomer.js 
```
### Run
```bash
node bamazonManager.js 
```
#### To
1. List all products
2. Add new products
3. Update stock of existing products in database
4. View products low in stock i.e less than 100
Follow the propmt on terminal.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Author
Mohak Tamhane
