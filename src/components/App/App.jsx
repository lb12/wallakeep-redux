import React from "react";
import { Provider } from 'react-redux'; 
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import EditAdvert from '../EditAdvert/EditAdvert';
import AdvertDetail from '../AdvertDetail/AdvertDetail';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Home from '../Home/Home';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

// import UserContext from "../../contexts/UserContext"; // QUITO_CONTEXTO

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstname: '',
        surname: '',
        tag: '',
      }
    }
  }

  componentDidMount() {
    const userOnLocalStorage = localStorage.getItem('wallakeep_user');
    const isUserLogged = this.state.user.firstname !== '';
    
    if (userOnLocalStorage && !isUserLogged){
      this.onUserLogin(JSON.parse(userOnLocalStorage));
    }
  }

  onUserLogin = user => {
    this.setState({ user });
  };

  isUserLogged = () => {
    const userOnLocalStorage = localStorage.getItem('wallakeep_user');

    if ( !userOnLocalStorage) return false;

    return this.state.user.firstname !== '';
  };

  render() {
    // QUITO_CONTEXTO
    /* const value = {
      user: this.state.user,
      onSubmit: this.onUserLogin
    }; */
    const store = this.props;

    return (  
      <div>
        <ErrorBoundary>
          {/* <UserContext.Provider value={value}> */}        
          <Provider store={store}>
            <Router>
              
                {
                  !this.isUserLogged()
                  &&
                  <React.Fragment>
                    <Route component={Login} />
                  </React.Fragment>
                }
                {
                  this.isUserLogged()
                  &&
                  <React.Fragment>              
                    <Navbar/>
                    <div id="main">
                      <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/create-advert" component={EditAdvert} /> {/* Create advert */}
                        <Route path="/edit-advert" component={EditAdvert} /> {/* Edit advert */}
                        <Route path="/advert/:id" component={AdvertDetail} />
                        <Route exact path="/" component={Home} />
                        <Route component={NotFoundPage} />
                      </Switch>
                    </div>
                </React.Fragment>
                }
            </Router>
          </Provider>
          {/* </UserContext.Provider> */}
        </ErrorBoundary>
      </div>
    );
  }
}
