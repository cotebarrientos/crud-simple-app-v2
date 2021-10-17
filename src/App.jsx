import React, { useEffect, useState } from "react"
import {firebase} from './firebase'


function App() {

  // Get all Tasks
  const [tasks, setTasks] = useState([])

  // Set a new task
  const [task, setTask] = useState('')

  // Set editing a task mode
  const [editingMode, setEditingMode] = useState(false)

  // Get Id
  const [id, setId] = useState('')

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

  // To remove a task from the database
  const deleteTask = async (id) => {
    try {

      const db = firebase.firestore()
      await db.collection('tasks').doc(id).delete()

      const filteredArray = tasks.filter(item => item.id !== id)
      setTasks(filteredArray)

    }
    catch (error) {
      console.log(error)
    }
  }

  // To activate the editing Mode
  const activateEditingTaskMode = (item) => {
    setEditingMode(true)
    setTask(item.name)
    setId(item.id)
  }

  // To edit a selected task
  const editTask = async (e) => {
    e.preventDefault()
    if(!task.trim()){
      return
    }
    try {

      const db = firebase.firestore()
      await db.collection('tasks').doc(id).update({
        name: task
      })

      const editedArray = tasks.map(item => (
        item.id === id ? {id: item.id, date: item.date, name: task} : item
      ))
      setTasks(editedArray)
      setEditingMode(false)
      setTask('')
      setId('')
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="container mt-3">
      <h1 className="text-center">
        <span className="text-success">C</span>
        <span className="text-primary">R</span>
        <span className="text-warning">U</span>
        <span className="text-danger">D </span>
        Simple App
        <i className="fas fa-clipboard-list padding-icons text-secondary"></i>
      </h1>
      <hr />
      <div className="row">
        <div className="col-md-8 col-xs-12">
          <h4 className="text-center mt-3 mb-3">My Tasks</h4>
          <ul className="list-group">
            {

              tasks.length === 0 ? (
                <li className="list-group-item">
                  <span className="lead">Sorry, no items yet</span>
                  <span className="padding-icons">
                  <i className="far fa-frown"></i>
                  </span>
                </li>
              ) : (
              tasks.map(item => (
                <li 
                  className="list-group-item"
                  key={item.id}
                  >
                    <span className="lead">{item.name}</span>
                      <button 
                        className="btn btn-danger btn-sm float-end mx-2"
                        onClick={() => deleteTask(item.id)}
                      >
                        <span className="text-uppercase">Delete</span>
                        <span className="padding-icons">
                          <i className="far fa-trash-alt"></i>
                        </span>  
                      </button>
    
                      <button 
                        className="btn btn-warning btn-sm float-end"
                        onClick={() => activateEditingTaskMode(item)}
                      >
                        <span className="text-uppercase">Edit</span>
                        <span className="padding-icons">
                          <i className="fas fa-pen"></i>
                        </span> 
                      </button>
                </li>
              ))
              )
            }
          </ul>
        </div>
        <div className="col-md-4 col-xs-12">
          <h4 className="text-center mt-3 mb-3">
            {
              editingMode ? "Edit a task" : "Add a task"
            }
          </h4>
          <form onSubmit={editingMode ? editTask : addTask}>
            <input
            type="text"
            placeholder="Add a new task"
            className="form-control mb-2" 
            onChange={(e) => setTask(e.target.value)}
            value={task}/>
            <div className="d-grid gap-2">
              <button 
                className={
                  editingMode ? "btn btn-warning" : "btn btn-dark"
                }
                type="submit"
              >
                  <span className="text-uppercase">
                  {
                    editingMode ? "edit" : "Add"
                  }
                  </span>
                  <span className="padding-icons">
                      <i className={
                        editingMode ? "fas fa-edit" : "far fa-plus-square"
                      }></i>
                  </span>
              </button>
              </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
