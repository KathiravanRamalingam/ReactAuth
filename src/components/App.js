import React from 'react';
import { Container } from 'react-bootstrap';
import AuthcontextProvider from '../contexts/auth';
import Signup from './signup';
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Dashboard from './Dashboard';
import Login from './login';
import Forgot from './Forgot';
import Update from './Update';
import PrivateRoute from './PrivateRoute';





function App() {
  return(
        
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
        <div class="row w-100" style={{maxWidth : '400px'}}>
        <Router>
          <AuthcontextProvider>
            <Switch>
             <PrivateRoute exact path="/" component={Dashboard} />

              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={Forgot} />
              <PrivateRoute path="/update-profile" component={Update} />

            </Switch>

            </AuthcontextProvider>
          </Router>


        
        </div>

    </Container>

    

  )
 
   
}


//Here above all the default generated things deleted
export default App;
