import React from "react";
import Tags from "../Tags/Tags";
import UserContext from "../../contexts/UserContext";



export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      user: this.context.user
    };
  }
  
  onSubmit = evt => {
    evt && evt.preventDefault();

    console.log(this.state.user);
    localStorage.setItem('user', JSON.stringify(this.state.user));
    this.context.onSubmit(this.state.user);
    this.props.history.push(`/`); // Le mando siempre a la pantalla de la Home
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

    this.setState({ user }, () => console.log(this.state.user));
  };

  render() {
    const { firstname, surname } = this.state.user;
    return (
      <div className="container">
        <h1>Sign in</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
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
            <Tags onTagSelected={this.onTagSelected} />
          </div>
          <button type="submit" className="btn btn-primary">Log in</button>
        </form>
      </div>
    );
  }
}
Login.contextType = UserContext;