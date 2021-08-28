import { useState, useEffect } from "react"
import { Link} from 'react-router-dom'
import axios from 'axios'
import { isEmail } from 'validator'



const RegisterScreen = ({ history }) => {
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error,setError] = useState('')
   
    useEffect(() =>{
        if(localStorage.getItem("authToken")){
            history.push('/')
        }
    },[history])

    const registerHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers:{
                "content-Type":"application/json"
            }
        }

        if(!isEmail(email)){
            return setError("Invalid email address please choose another")
        }

        if(password.length < 7){
            return setError("Password must contain at least 7 characters")
        }

        if(password !== confirmPassword){
            setPassword('')
            setConfirmPassword('')
            setTimeout(() =>{
                setError("")
            }, 5000)
            return setError("Passwords do not match")
        }

        try{
            const { data } = await axios.post('/api/users/signup',{ name, email, password },config)
            localStorage.setItem('authToken', data.token)
            history.push('/')
        }catch(err){
            setError('Email is taken please choose another.')
            
        }

        setTimeout(() =>{
            setError('')
        }, 5000)
    }
        
    return (
        
        <div className="container">
            <header className="header">
                <h1>Sign Up</h1>
            </header>
        <form className="add-form" onSubmit={registerHandler}>
            {error && <span style={{ color: 'red' }} >{error}</span>}
        <div className="form-control">
                <label htmlFor="fullname">Full Name</label>
                <input type='text'
                 required
                 id="fullName"
                 placeholder="Enter your full name"
                 value={name}
                 onChange={(e) => setName(e.target.value)} />
            </div>
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
            <div className="form-control">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input type='password'
                 required
                 id="confirm-password"
                 placeholder="Confirm password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            
            
            <input type="submit" value='Register' className="btn btn-block" />
        </form>
        <span>Already have an account? <Link to='/login'>Login</Link></span>
        </div>
    )
}

export default RegisterScreen
