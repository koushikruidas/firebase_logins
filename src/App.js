import React from 'react';
import Signup from './component/Signup';
import "bootstrap/dist/css/bootstrap.css";
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import DashBoard from './component/DashBoard';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import SignIn from './component/SignIn';
import PrivateRoute from './component/PrivateRoute';
import PasswordReset from './component/PasswordReset';

function App() {
  return (

    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={DashBoard} />
              <Route path="/login" component={SignIn} />
              <Route path="/Signup" component={Signup} />
              <Route path="/password-reset" component={PasswordReset} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>

  );
}

export default App;
