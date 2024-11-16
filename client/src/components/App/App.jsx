import React, {useState, useEffect} from "react";

//Components
import InputTodo from "../InputTodo/InputTodo.jsx"
import ListTodos from "../ListTodos/ListTodos.jsx"

function App() {

    const [todos, setTodos] = useState([]);

    async function getTodos() { //get all todos from database
        try {
            const response = await fetch("http://localhost:8000/todos");
            const jsonData = await response.json() // Extracts the data specifically from the body of the HTTP response and parses JSON data into JS object 
            setTodos(jsonData); //Set the state of todos to jsonData
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getTodos();
    }, []);

    //delete function that is being passed as props to ListTodos component
    async function deleteTodo(id) {
        try {
            const deleteTodo = await fetch(`http://localhost:8000/todos/${id}`, {
                method: "DELETE",
            });
            console.log(deleteTodo);
            setTodos(todos.filter(todo => todo.todo_id !== id)) // use filter method to renew state of todos
        } catch (err) {
            console.error(err.message)
        }
    }

    //delete function that is being passed as props to InputTodos component
    async function onSubmitForm(event, description) {
        event.preventDefault() //Stops the form from reloading after submission
        try {
            const body = { description }
            const response = await fetch("http://localhost:8000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response)
            getTodos();
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="container">
            <InputTodo onSubmitForm={onSubmitForm}/>
            <ListTodos todos={todos} deleteTodo={deleteTodo} getTodos={getTodos}/>
        </div>
    )
}

export default App;