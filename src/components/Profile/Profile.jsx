import React from "react";
import UserContext from "../../contexts/UserContext";

import './Profile.css';

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
            <h1 className="text-center mt-4">User profile</h1>
            <div className="mt-4">
              <h2>{firstname + " " + surname}</h2>
              <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda corrupti ab ad molestias veniam quod officia architecto minus, fugiat dolores. In adipisci sunt modi, saepe maiores sapiente repudiandae delectus odit!</p>
              <p>Interested on <b>{tag}</b> adverts</p>
            </div>
          </div>
        }
      </div>
    );
  }
}
Profile.contextType = UserContext;