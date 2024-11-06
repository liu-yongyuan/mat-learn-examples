-- PRIVILEGES   
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'my-secret-pw' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- character_set to utf8mb4
SHOW VARIABLES LIKE 'character_set%';