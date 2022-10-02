import React from "react"
import { Link } from "react-router-dom"

export default function allTodos(props){
    function findAnyTodo(){
        if(props.noOfTodos > 0){
            const anyTodo = true
            return anyTodo
        }
        else{
            const anyTodo = false
            return anyTodo
        }
    }
    return(
        <div className="all-todos-div">
            {findAnyTodo() ? <div className="ten"><h3>Things to be Done</h3></div>: <div className="ten"><h3>Nothing to be Done</h3></div>}
            {props.listOfTodos.map(eachTodo => {
                return(
                    <ul key = {eachTodo.id} className="todo-list">
                        <Link to = {`${eachTodo.id}`} style={{ textDecoration: 'none', color: '#f5f6fa' }}>
                            <li className="each-todo">{eachTodo.content}</li>
                            <input type="date" id="birthday" name="birthday"></input>
                        </Link>
                    </ul>
                )
            })}
        </div>
    )
}
    