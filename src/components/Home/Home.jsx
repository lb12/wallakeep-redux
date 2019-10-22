import React from "react";

import * as API from '../../services/APIService';
import Filters from '../Filters/Filters';
import AdvertList from '../AdvertList/AdvertList';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adverts: []
    };

    this.searchAdverts({});
  }

  searchAdverts = async filters => {
    const adverts = await API.listAdverts(filters, 10, 1);
    this.setState({adverts});
  };

  render() {
    const { adverts } = this.state;
    return (
      <div>
        <Filters onSubmit={this.searchAdverts} />
        <hr />
        <AdvertList adverts={adverts}/>
      </div>
    );
  }
}
