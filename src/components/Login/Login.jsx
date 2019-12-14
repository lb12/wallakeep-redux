import React from "react";

import Tags from "../Tags";
import './Login.css';
import Form from "../Form";
import Input from "../Input";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tag: ''
    };
  }
  
  onSubmit = inputs => {
    const { firstname, surname } = inputs;
    const user = { firstname, surname, tag: this.state.tag };
    
    this.props.setUser(user); // Save user into redux-store
    this.props.history.push('/'); //  Redirect user to home page always
  };


  onTagSelected = optionSelected => ( this.setState({ tag: optionSelected }) );

  render() {
    return (
      <div className="container login">
        <h1>Login</h1>
        <Form className="mt-4" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <Input
              type="text"
              required
              name="firstname"
              className="form-control"
              placeholder="Enter firstname"
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <Input 
              type="text"
              required="required"
              name="surname"
              className="form-control"
              placeholder="Enter surname"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags-select">Tags</label>
            <Tags required={true} onTagSelected={this.onTagSelected} />
          </div>
          <button type="submit" className="btn btn-primary mt-1">Login</button>
        </Form>
      </div>
    );
  }
}