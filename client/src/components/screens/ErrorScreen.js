import { Link } from 'react-router-dom'

const ErrorScreen = ({title = '404',error ='Page not found'}) => {
    return (
        <div className="container">
            <h1>{title}</h1>
            <br></br>
            <p>{error}<br />Try to <Link to='/login'>login</Link></p>   
        </div>
    )
}

export default ErrorScreen
