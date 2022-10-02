import React from "react"

export default function AddTodos(props){
    function handleChange(event){
        props.onFormChange(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()
        props.onFormSubmit()
    }
    return(
        <div className="container__item">
            <div className="ten"><h1>My Todo List</h1></div>
		    <form className="form" onSubmit={handleSubmit}>
                <input type = "text" className="form__field" placeholder="Add a new Todo" required value={props.userInput} onChange = {handleChange}/>
                <button type="text" className="btn btn--primary btn--inside uppercase">Add Todo</button>
		    </form>
	    </div>
    )
}