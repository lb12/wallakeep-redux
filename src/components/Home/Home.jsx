import React from "react";

import * as API from '../../services/APIService';
import Filters from '../Filters/Filters';
import AdvertList from '../AdvertList/AdvertList';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        name: "",
        price: "",
        tag: "",
        type: ""
      },
      adverts: []
    };
  }

  onSubmitFilters = filters => {
    this.setState({filters}, () => this.searchAdverts(filters));
  };

  searchAdverts = async filters => {
    const adverts = await API.listAdverts(filters, 10, 1);
    this.setState({adverts}, () => console.log(this.state));
  };

  render() {
    const { adverts } = this.state;
    return (
      <div>
        <Filters onSubmit={this.onSubmitFilters} />
        <hr />
        <AdvertList adverts={adverts}/>
      </div>
    );
  }
}
