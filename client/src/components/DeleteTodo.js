import React from 'react'
import { useHistory } from "react-router-dom"

export default function DeleteTodo({id}){
    const history = useHistory()
    function deleteATodo(){
        fetch(`api/${id}`,{
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        }).then (response => response.json())
            .then (data => {
                    console.log(data)
                    history.push('/')
                }
            )
    }
    return(
        <>
            <button onClick={deleteATodo} className="btn-functions delete-btn">Delete</button>
        </>
    )
}