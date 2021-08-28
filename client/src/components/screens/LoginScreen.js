import { useState, useEffect } from "react"
import { Link} from 'react-router-dom'
import axios from 'axios'

const baseURL='http://localhost:5000/'
const api = axios.create({
    baseURL 
  })

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
   
    useEffect(() =>{
        if(localStorage.getItem("authToken")){
            history.push('/')
        }
    },[history])

    const loginHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers:{
                "content-Type":"application/json"
            }
        }


        try{
            const { data } = await api.post('/users/login',{  email, password }, config)
            localStorage.setItem('authToken', data.token)
            history.push('/')
        }catch(err){
            console.log(err)
            setError(err.response.data.error)
            setTimeout(() =>{
                setError('')
            }, 5000)
        }
    }
        
    return (
        <div className="container">
            <header className="header">
                <h1>Login</h1>
            </header>
        <form className="add-form" onSubmit={loginHandler}>
            {error && <span>{error}</span>}
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type='email'
                 required
                 id="email"
                 placeholder="Enter Email address"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type='password'
                 required
                 id="password"
                 placeholder="Enter Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)} />
            </div>
           
            <input type="submit" value='Login' className="btn btn-block" />
        </form>
        <span>Don't have an account? <Link to='/register'>Register</Link></span>
        </div>
    )
}

export default LoginScreen