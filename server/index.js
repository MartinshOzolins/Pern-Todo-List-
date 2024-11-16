import express from "express";
import cors from "cors";
import db from "./db.js"

const app = express();
const port = 8000;

//middleware
app.use(express.json());


//CORS middleware allows Cross-Origin Resource Sharing (CORS), specifically it allows requests from a different origin (domain, protocol, or port)
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend
})); 



//Routes//

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await db.query("SELECT * FROM todo")

        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body; //Destructuring to get the value of description within JSON object { description: 'value' }
        const newTodo = await db.query("INSERT INTO todo (description) VALUES ($1) RETURNING * ", [description]);

        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await db.query("SELECT * FROM todo WHERE todo_id = $1", [id])

        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})


//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        // Destructure the "description" property from the request body (req.body)
        // When the client sends data as JSON, the body contains an object like { description: "value" }
        // This extracts only the "description" property from req.body and assigns its value to the variable "description"
        // Equivalent to: const description = req.body.description;
        const todo = await db.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [ description ,id])

        res.json("Todo was updated")
    } catch (err) {
        console.error(err.message)
    }
})



//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await db.query("DELETE FROM todo WHERE todo_id = $1", [id])

        res.json("Todo was deleted")
    } catch (err) {
        console.error(err.message)
    }
})






app.listen(port, () => {
    console.log("server has started on port", port)
})