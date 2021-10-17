import React, { useEffect, useState } from "react"
import {firebase} from './firebase'


function App() {

  // Get all Tasks
  const [tasks, setTasks] = useState([])

  // Set a new task
  const [task, setTask] = useState('')

  //Get all task stored in Firebase Firestore
  useEffect(() => {
    
    const getData = async () => {

      try {

        const db = firebase.firestore()
        const data = await db.collection('tasks').get()
        const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        console.log(arrayData)
        setTasks(arrayData)
      } catch (error) {
        console.log(error)
      }

    }

    getData()
  }, [])


  // To add a new task in the database
  const addTask = async (e) => {
    e.preventDefault()

    if(!task.trim()){
      console.log('empty field')
      return
    }

    try {

      const db = firebase.firestore()
      const newTask = {
        name: task,
        date: Date.now()
      }
      const data = await db.collection('tasks').add(newTask)
      // To create an array copy with the new data
      setTasks([
        ...tasks,
        {...newTask, id: data.id}
      ])
      // To clean the input field
      setTask('')
    }
    catch (error){
      console.log(error)
    }
    
    console.log(task)
  }

  return (
    <div className="container mt-3">
      <h1 className="text-center">
        <span className="text-success">C</span>
        <span className="text-primary">R</span>
        <span className="text-warning">U</span>
        <span className="text-danger">D </span>
        Simple App
      </h1>
      <hr />
      <div className="row">
        <div className="col-md-8 col-xs-12">
          <h4 className="text-center mt-3 mb-3">My Tasks</h4>
          <ul className="list-group">
            {
              tasks.map(item => (
                <li 
                className="list-group-item"
                key={item.id}>{item.name}</li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-4 col-xs-12">
          <h4 className="text-center mt-3 mb-3">Form</h4>
          <form onSubmit={addTask}>
            <input
            type="text"
            placeholder="Add a new task"
            className="form-control mb-2" 
            onChange={(e) => setTask(e.target.value)}
            value={task}/>
            <div className="d-grid gap-2">
              <button 
              className="btn btn-dark"
              type="submit">
                Add
              </button>
              </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
