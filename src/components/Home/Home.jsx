import React from "react";

import * as API from '../../services/APIService';
import Filters from '../Filters/Filters';
import AdvertList from '../AdvertList/AdvertList';
import UserContext from "../../contexts/UserContext";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adverts: []
    }; 
  }

  getAdvertsByUserTag = adverts => {
    if (adverts.length === 0) {
      const {tag} = this.context.user;
      this.searchAdverts( { tag } );
    }
  };

  searchAdverts = async filters => {
    const adverts = await API.listAdverts(filters, 10, 1);
    this.setState({adverts});
  };

  render() {
    const { adverts } = this.state;
    this.getAdvertsByUserTag(adverts);
    
    return (
      <div>
        <React.Fragment>
          <Filters onSubmit={this.searchAdverts} />
          <hr />
          <AdvertList adverts={adverts}/>
        </React.Fragment>
      </div>
    );
  }
}
Home.contextType = UserContext;
