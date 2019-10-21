import React from "react";

import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{backgroundColor: 'aqua'}}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create-advert">Create advert</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
    );
  }
}