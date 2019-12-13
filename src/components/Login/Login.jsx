import React from "react";

import Tags from "../Tags/Tags";
import './Login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: { 
        firstname: '', 
        surname: '', 
        tag: '' 
      }
    };
  }
  
  onSubmit = evt => {
    evt && evt.preventDefault();
    this.props.setUser(this.state.user); // Save user into redux-store
    this.props.history.push('/'); //  Redirect user to home page always
  };

  onInputChange = evt => {
    const { name, value } = evt.target;

    this.setState(({ user }) => ({
      user: {
        ...user,
        [name]: value
      }
    }));
  };

  onTagSelected = optionSelected => {
    let user = this.state.user;
    user.tag = optionSelected;

    this.setState({ user });
  };

  render() {
    const { firstname, surname } = this.state.user;
    return (
      <div className="container login">
        <h1>Login</h1>
        <form className="mt-4" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              required
              name="firstname"
              value={firstname}
              className="form-control"
              placeholder="Enter firstname"
              onChange={this.onInputChange}
              id=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              required
              name="surname"
              value={surname}
              className="form-control"
              placeholder="Enter surname"
              onChange={this.onInputChange}
              id=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags-select">Tags</label>
            <Tags required={true} onTagSelected={this.onTagSelected} />
          </div>
          <button type="submit" className="btn btn-primary mt-1">Login</button>
        </form>
      </div>
    );
  }
}