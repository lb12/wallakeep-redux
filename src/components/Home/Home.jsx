import React from "react";
import axios from 'axios';

import * as API from '../../services/APIService';
import Filters from '../Filters/Filters';
import AdvertList from '../AdvertList/AdvertList';
import UserContext from "../../contexts/UserContext";

import './Home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adverts: [],
      hasFiltered: false
    }; 
  }

  // Cancela cualquier peticion que no se haya podido completar debido a que el componente se haya desmontado
  source = axios.CancelToken.source();

  componentWillUnmount() {
    this.source.cancel('Home component');
  }

  getAdvertsByUserTag = () => {
    const {tag} = this.context.user;
    this.searchAdverts( { tag } );
  };

  searchAdverts = async filters => {
    const adverts = await API.listAdverts(filters, 5, 1, this.source);
    if ( adverts )
      this.setState({adverts});
  };

  onFiltered = filters => {
    this.searchAdverts(filters);
    this.setState({hasFiltered: true});
  };

  render() {
    const { adverts, hasFiltered } = this.state;
    const h1Message = hasFiltered ? `${adverts.length ? adverts.count : 0} adverts were found.` : `Adverts based on your favourite tag: `;
    
    !hasFiltered && this.getAdvertsByUserTag(adverts);
    
    return (
      <div>
        <React.Fragment>
          <Filters onSubmit={this.onFiltered} />
          <p className="results-message">{h1Message} <b>{!hasFiltered ? this.context.user.tag : ''}</b></p>
          <AdvertList adverts={adverts}/>
        </React.Fragment>
      </div>
    );
  }
}
Home.contextType = UserContext;
