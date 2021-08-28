import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import Tasks from '../../components/Tasks'
import AddTask from '../../components/AddTask'
import ErrorScreen from './ErrorScreen'
import Button from '../../components/Button'

const baseURL='http://localhost:5000/'
const api = axios.create({
    baseURL 
  })

  const config = {
    headers:{
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
 }

 

const TaskScreen = ({ history } ) => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState('')
  const [error, setError] = useState('')
  const [taskFlag,setTaskFlag] = useState(false)
  const [errStatus,setErrStatus] = useState(null)

  
  useEffect(() => {
    taskFlag && setTaskFlag(!taskFlag)
    
    const config = {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
   }

    if(!localStorage.getItem("authToken")){
        history.push('/login')
    }
    const fetchPrivateTasks = async () =>{
        
        try{
            const { data } = await api.get('/tasks', config)
            setTasks(data)
        }catch(err){
            localStorage.removeItem("authToken")
            setError("You are not authorized please login")
            setErrStatus('400')   
        }
    }

    fetchPrivateTasks()
  },[history,taskFlag])

  const logoutHandler = () => {
      localStorage.removeItem("authToken")
      history.push('/login')
  }

  
 
  // Add Task 
  const addTask = async (data)=> {
    await api.post('/tasks',{...data},config)
    setTaskFlag(true)
  }

  // Delete Task
    const deleteTask = async (id) => {
      await api.delete(`/tasks/${id}`,config)
      setTaskFlag(true)
    }

  // Toggle reminder
    const toggleReminder = async (id, reminder) => {
      await api.patch(`/tasks/${id}`,{'reminder': !reminder},config)
      setTaskFlag(true)
    }  

  return (
    error ? <ErrorScreen title={errStatus} error={error} /> :
    <div className="container"  >
      <Header onAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}/>
      { showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleReminder} />
        ):(
          'No Task to Show'
        )}
        <br></br>
        <Button onClick={logoutHandler} color={'black'} text={'Logout'} />
        {/* <button onClick={logoutHandler} className="btn btn-block">Logout</button> */}
    </div>
  );
}

export default TaskScreen
