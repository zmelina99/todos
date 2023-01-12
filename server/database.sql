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


INSERT INTO categories 
VALUES ( 2,'green', 'sports');


ALTER TABLE categories
ADD FOREIGN KEY (category_id) REFERENCES categories(category_id);

ALTER TABLE todo 
ADD COLUMN created_at DATE NOT NULL ;

ALTER TABLE todo
ADD COLUMN name VARCHAR(250)

ALTER TABLE todo
ADD COLUMN completed BOOLEAN;

ALTER TABLE categories  
DROP COLUMN name;


 ALTER TABLE categories 
 ADD COLUMN category_name VARCHAR(100);

ALTER TABLE todo ADD CONSTRAINT distfk FOREIGN KEY (category_id) REFERENCES categories (category_id);

