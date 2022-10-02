import React, {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom"
import DeleteTodo from "../components/DeleteTodo"
import EditTodo from "../components/EditTodo"

export default function ShowTodoPage({setUpdate}){
    const { id } = useParams()
    const [todo, setTodo] = useState([])

    useEffect(() => {
        fetch(`api/${id}`)
        .then(response => response.json())
        .then(data => setTodo(data))
    }, [id])

    return(
        <>
            <div className="single-todo-div">
                <div className="ten"><h1>Make changes to a todo.</h1></div>
                <div className="div-functions-todo">
                    {todo.length > 0 && todo.map(data => <div key = {id}>{data.content}</div>)}
                    <DeleteTodo id = {id}/>
                    <EditTodo id = {id}/>
                </div>
                <Link to='/' style={{ textDecoration: 'underline', color: '#f5f6fa', textAlign: 'center' }}>Back to Todos</Link>
            </div>
        </>
    )
}