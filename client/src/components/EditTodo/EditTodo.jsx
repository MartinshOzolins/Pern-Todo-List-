import React, {useState} from "react";

function EditTodo({todo, getTodos}) { //Destructure props into todo object and getTodos function

    const [description, setDescription] = useState(todo.description)
    //Set the inital value from props

    //edit description function
    async function updateDescription(event) {
        event.preventDefault()
        try {
            const body = {description}; 
            // This is shorthand syntax for object property value.
            // It creates an object equivalent to { description: description }.
            // The key is "description", and its value is taken from the variable "description", which is managed by useState.
            const response = await fetch(`http://localhost:8000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body) //Converts body to JSON object
            })

            getTodos();
            console.log(response)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
       <>
       <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}> 
            {/* data-bs-target targets the id in modal to open, so each should be unique for each note */}
            Edit
       </button>

    <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
        <div className="modal-dialog">
            <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Edit Todo</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}></button>
            </div>


            <div className="modal-body">
                <input type="text" className="form-control" value={description} onChange={((event) => (setDescription(event.target.value)))} ></input>
            </div>


            <div className="modal-footer">
                <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={(event) => updateDescription(event)}>Edit</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
            </div>

            </div>
        </div>
    </div>
       </>
    )
}

export default EditTodo;