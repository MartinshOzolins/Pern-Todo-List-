import React, {useState} from "react";

function InputTodo(props) {
    const [description, setDescription] = useState("");

    return (
        <>
        <h1 className="text-center mt-5"> Pern Todo List</h1>
        <form onSubmit={(event) => {
            props.onSubmitForm(event, description)
            setDescription("")
        }} 
            className="d-flex mt-5">
            <input className="form-control" type="text" value={description} onChange={((event) => {setDescription(event.target.value)})} maxLength="66"></input>
            <button className="btn btn-success" type="submit">Add</button>
        </form>
        </>
    )
}

export default InputTodo;