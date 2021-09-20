import { Route, BrowserRouter, Switch  } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Profile  from './pages/Profile'
import FirstPage from './pages/FirstPage';
import PrivateRoute from './privateRoutes/PrivateRoute'
import Home from './pages/HomePage';
import Admin from './pages/adminPage';
import AdminPrivatRoute from './privateRoutes/adminPrivatRoute';
import Question from './pages/question';
import Solution from './pages/solutionPage';
import ContactUs from './pages/contactUs';







function App() {
  return (
    <div>
      <BrowserRouter>      
        <Switch>
          <Route exact path="/" component={FirstPage}/>
          <Route exact path="/login" component={LoginPage}/> 
          <Route exact path="/register" component={RegisterPage}/> 
          <PrivateRoute exact path="/Profile" component={Profile}/>
          <PrivateRoute exact path="/Home" component={Home}/>
          <PrivateRoute exact path="/Question" component={Question}/>
          <PrivateRoute exact path="/Solution" component={Solution}/>
          <PrivateRoute exact path="/Contact" component={ContactUs}/>
          <AdminPrivatRoute exact path="/admin" component={Admin}/>
        </Switch>
      </BrowserRouter>    
    </div>
  );
}

export default App;
