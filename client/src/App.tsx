import React from 'react'
import './App.css'
import {BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import TaskEdit from './components/TaskEdit'
import TaskNew from './components/TaskNew'

interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

function App() {
  return (
    <BrowserRouter>      
      <div className="App">
        <Header/>
        <Route path='/' exact component={Home} /> 
        <Route path='/task_edit/:id' component={({match}: MatchProps) => { return <TaskEdit taskId = {match.params.id}/> }} />
        <Route path='/task_new' component={TaskNew} />      
      </div>    
    </BrowserRouter>
  );
}
export default App
