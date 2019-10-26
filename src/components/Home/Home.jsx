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

  componentDidMount() {
    // Compruebo que no haya filtrado (just in case) y obtengo los ads por el tag del user
    !this.state.hasFiltered && this.getAdvertsByUserTag();
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
    const h1Message = hasFiltered ? `${adverts.count} adverts were found.` : `Adverts based on your favourite tag: `;
    
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
