import React from "react";

import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = evt => {
    evt && evt.preventDefault();

    localStorage.removeItem('wallakeep_user');
    window.location.reload();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Wallakeep</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"> <Link className="nav-link" to="/create-advert">Create advert</Link> </li>
            <li className="nav-item"> <Link className="nav-link" to="/profile">Profile</Link> </li>
          </ul>
          <button className="btn btn-outline-success" onClick={this.logout}>Logout</button>
        </div>
      </nav>
    );
  }
}