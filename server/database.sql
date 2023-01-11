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
VALUES (2, 'sports', 'blue');


INSERT INTO todo 
VALUES ( 1, 'play basketball', false);


ALTER TABLE categories
ADD FOREIGN KEY (category_id) REFERENCES categories(category_id);

ALTER TABLE todo 
ADD COLUMN completed BOOLEAN NOT NULL;

ALTER TABLE todo  
DROP COLUMN completed;
