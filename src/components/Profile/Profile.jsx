import React from "react";
import UserContext from "../../contexts/UserContext";

export default class Profile extends React.Component {
  render() {
    const { user } = this.context;
    const { firstname, surname, tag } = user;
    return (
      <div>
        {
          user
          &&
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