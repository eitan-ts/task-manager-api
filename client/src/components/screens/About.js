import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className="container">
            <h1>About</h1>
            <br></br>
            <p>
              A simple web app for writing down tasks.
              <br></br>
              Quickly add and remove tasks.
              <br></br>
              <br></br>
              You can double click on a task to set a reminder!
              <br></br>
              <br></br>
            </p>
            <p>start using it <Link to='/login'>now!</Link></p>         
        </div>
    )
}

export default About
