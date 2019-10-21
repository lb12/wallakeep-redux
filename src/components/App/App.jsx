import React from "react";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import EditAdvert from '../EditAdvert/EditAdvert';
import AdvertDetail from '../AdvertDetail/AdvertDetail';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Home from '../Home/Home';

import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/create-advert" component={EditAdvert} /> {/* Create advert */}
            <Route path="/edit-advert/:id" component={EditAdvert} /> {/* Edit advert */}
            <Route path="/advert/:id" component={AdvertDetail} />
            <Route exact path="/" component={Home} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
