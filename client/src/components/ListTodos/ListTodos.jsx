import React from "react";

//components
import EditTodo from "../EditTodo/EditTodo";


function ListTodos({todos, deleteTodo, getTodos}) {
    //destructure props into seperate variables, first one is todos array with objects, and second one is deleteTodo function reference
    return (
        <>
        <table className="table mt-5">
            <thead> 
                <tr> 
                    <th scope="col">Description</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody> 
                { todos.map((todo) => {
                    return (
                    <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td> <EditTodo todo={todo} getTodos={getTodos}/></td>
                    <td> <button type="button" className="btn btn-danger" onClick={() => {deleteTodo(todo.todo_id)}}>Delete</button></td>
                    </tr> );

                })}
            </tbody>
        </table>
        </>
    )
}

export default ListTodos;