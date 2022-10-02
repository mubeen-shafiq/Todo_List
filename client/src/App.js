import React from 'react'
import TodoPage from './Pages/TodoPage'
import ShowTodoPage from './Pages/ShowTodoPage'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"
  import "./styles/styles.scss"

export default function App(){
    return(
        <div className='App'>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <TodoPage />
                    </Route> 
                    <Route path='/:id'>
                        <ShowTodoPage/>
                    </Route>
                    </Switch>
            </Router>
        </div>
    )
}