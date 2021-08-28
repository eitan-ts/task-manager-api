import { FaTimes } from 'react-icons/fa'
import Moment from 'react-moment';

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task._id,task.reminder)}>
            <h3>{task.desc} <FaTimes style ={{ color:'red', cursor: 'pointer' }} onClick={() => onDelete(task._id)} /></h3>
            <Moment date={task.day} format="DD-MM-YYYY HH:mm"/>
                {/* <p>{task.day.split('T')[0] + task.day.split('T')[1]}</p> */}
        </div>
        
    )
}

export default Task
