import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Component
import Footer from './components/Footer'
// Routing
import PrivateRoute from './components/routing/PrivateRoute'

// Screens
import TaskScreen from './components/screens/TaskScreen'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ErrorScreen from './components/screens/ErrorScreen'
import About from './components/screens/About'
// import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen'
// import ResetPasswordScreen from './components/screens/ResetPasswordScreen'

const App = () => {

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={TaskScreen} />
        <Route exact path='/about' component={About} ></Route>
        <Route exact path='/login' component={LoginScreen}></Route>
        <Route exact path='/register' component={RegisterScreen}></Route>
        {/* <Route exact path='/profile' component={Profile}></Route> */}
        <Route path='*' component={ErrorScreen}></Route>
      </Switch>
      <Footer />
    </Router>
    
  );
}

export default App;
