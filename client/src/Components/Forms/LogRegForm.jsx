import React, {useState, useContext} from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Alert from "../Alerts/Alert"
import "./Form.css"

export default function LogReg({type}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const {register, authorizedUser, login} = useContext(AuthContext)
  const navigate = useNavigate()
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type, action) => {
    setAlert({message, type, action})
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await register(firstName, lastName, email, password)
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      navigate("/home")
    } catch (error) {
      showAlert(error.response.data.error, "failure", null)
      console.log(error)
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      setEmail("")
      setPassword("")
      navigate("/home")
    } catch (error) {
      showAlert(error.response.data.error, "failure", null)
      console.log(error)
    }
  }
  console.log(authorizedUser)

  return (
    <>
      {alert && <Alert message={alert.message} type={alert.type} action={alert.action} onClose={()=>setAlert(null)}/>}
      <div className="logreg-wrap">
        {type === "login" ? 
          <form className="login-form" onSubmit={handleLogin}>
            <h1>Welcome Back</h1>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label/>
            <button type="submit">Log In</button>
          </form>
          :
          <form className="register-form" onSubmit={handleRegister}>
            <h1>Get Started Today</h1>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label/>
            <button type="submit">Join</button>
          </form>
        }
      </div>
    </>
        
  )
}
