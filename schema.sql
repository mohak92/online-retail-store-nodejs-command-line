DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(75) NULL,
  department_name VARCHAR(75) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(6) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("iPhone 11 Pro Max", "Electronics", 1149.99, 100),
("Echo", "Electronics", 49.99, 120),
("Javascript 101", "Books", 29.99, 950),
("Ferrari Team Polo", "Clothing", 79.99, 200),
("PS 4 Pro", "Gaming", 399.99, 10),
("Soylent", "Grocery", 24.99, 1000),
("Tylenol", "Medical", 9.49, 2560),
("RU Coding Bootcamp", "Education", 10499.99, 30),
("Mac Pro", "Electronics", 5999.99, 150),
("Pepsi", "Food", 0.99, 50000);

SELECT * FROM products;

UPDATE products 
SET stock_quantity = 98
WHERE item_id = 1;

SELECT * 
FROM products
WHERE stock_quantity < 100;
