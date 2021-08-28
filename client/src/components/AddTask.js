import { useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const AddTask = ({ onAdd }) => {

    const [desc, setDesc] = useState('')
    const [day, setDay] = useState(new Date())
    const [reminder, setReminder] = useState(false)
    const [error, setError] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!desc){
            return setError('Please add a description')
        }

        onAdd({ desc, day, reminder })

        setDesc('')
        setDay('')
        setReminder(false)
    }
        
    return (
        <form className="add-form" onSubmit={onSubmit}>
            {error && <span style={{ color: 'red' }} >{error}</span>}
            <div className="form-control">
                <label>Task</label>
                <input type='text'
                 placeholder="Add Task"
                 value={desc}
                 onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <DatePicker
                 selected={day}
                 onChange={(day) => setDay(day)}
                 minDate={new Date()} 
                 isClearable
                 dateFormat="dd/MM/yyyy"
                 showTimeInput
                 placeholderText="Pick a date"
                 />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type='checkbox'
                checked={reminder}
                 value={reminder}
                 onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>
            
            <input type="submit" value='Save Task' className="btn btn-block" />
        </form>
    )
}

export default AddTask
