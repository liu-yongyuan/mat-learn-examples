-- PRIVILEGES   
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'my-secret-pw' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- character_set to utf8mb4
SHOW VARIABLES LIKE 'character_set%';


-- character set 
SET character_set_client = utf8mb4; 
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

-- database create
CREATE DATABASE online_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- databse set
ALTER DATABASE online_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- online store tables
use online_store;
CREATE TABLE customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


use online_store;
CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  parent_category_id INT DEFAULT NULL,
  FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);


use online_store;
CREATE TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  category_id INT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

use online_store;
CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT,
  status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);


use online_store;
CREATE TABLE order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

use online_store;
CREATE TABLE payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('credit_card', 'paypal', 'bank_transfer') NOT NULL,
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

use online_store;
CREATE TABLE product_reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  customer_id INT,
  rating INT CHECK(rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);