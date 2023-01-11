CREATE DATABASE perntodo; 

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, 
    description VARCHAR (250) 
)

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY , 
    name VARCHAR(100), 
    color VARCHAR(100)
);

DELETE  FROM categories 
WHERE category_id = 1;

INSERT INTO categories 
VALUES (1, 'groceries', 'orange');


ALTER TABLE categories
ADD FOREIGN KEY (category_id) REFERENCES categories(category_id);