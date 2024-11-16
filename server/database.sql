-- Create the database
CREATE DATABASE todo_database_pern_stack;

-- Create the "todo" table
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, 
    description VARCHAR(255)
)