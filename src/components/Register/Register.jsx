import React from "react";
import Tags from "../Tags/Tags";
import UserContext from "../../contexts/UserContext";



export default class Register extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      user: this.context.user
    };
  }
  
  onSubmit = evt => {
    evt && evt.preventDefault();

    console.log(this.state.user);
    this.context.onSubmit(this.state.user);
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
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <p>Firstname</p>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={this.onInputChange}
              id=""
            />
          </div>
          <div>
            <p>Surname</p>
            <input
              type="text"
              name="surname"
              value={surname}
              onChange={this.onInputChange}
              id=""
            />
          </div>
          <div>
            <p>Tag</p>
            <Tags onTagSelected={this.onTagSelected} />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    );
  }
}
Register.contextType = UserContext;