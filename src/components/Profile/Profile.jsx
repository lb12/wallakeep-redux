import React from "react";
import UserContext from "../../contexts/UserContext";

export default class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: this.context.user
    };
  }

  render() {
    const { user } = this.state;
    const { firstname, surname, tag } = user;
    return (
      <div>
        {
          <div>
            <h1>{firstname}</h1>
            <h2>{surname}</h2>
            <p>{tag}</p>
          </div>
        }
      </div>
    );
  }
}
Profile.contextType = UserContext;