import React from "react"

export default function EditTodo({id}){
    function handleClick(){
        console.log(fetch(`/api/${id}/update`, {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        }).then(response => response.json())
        .then(data => console.log(data)))
    }
    return(
        <button onClick={handleClick} className= "btn-functions update-btn">Update</button>
    )
}