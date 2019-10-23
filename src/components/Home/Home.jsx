import React from "react";

import * as API from '../../services/APIService';
import Filters from '../Filters/Filters';
import AdvertList from '../AdvertList/AdvertList';
import UserContext from "../../contexts/UserContext";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adverts: [],
      hasFiltered: false
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

  onFiltered = filters => {
    this.searchAdverts(filters);
    this.setState({hasFiltered: true});
  };

  render() {
    const { adverts, hasFiltered } = this.state;
    const h1Message = hasFiltered ? `${adverts.count} adverts were found.` : `Adverts based on your favourite tag: '${this.context.user.tag}'`;
    
    !hasFiltered && this.getAdvertsByUserTag(adverts);
    
    return (
      <div>
        <React.Fragment>
          <Filters onSubmit={this.onFiltered} />
          <hr />
          <h1>{h1Message}</h1>
          <AdvertList adverts={adverts}/>
        </React.Fragment>
      </div>
    );
  }
}
Home.contextType = UserContext;
