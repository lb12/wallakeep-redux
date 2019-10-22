import React from "react";

export default class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>404</h1> <h2>Oops, something went wrong.</h2>
        <p>This page does not exist.</p>
      </div>
    );
  }
}
