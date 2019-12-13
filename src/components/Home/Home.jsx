import React from "react";
import axios from 'axios';

import * as API from '../../services/APIService';
import Filters from '../Filters';
import AdvertList from '../AdvertList';
import Pagination from "../Pagination";

import { PaginationFilters } from '../../utils/variables';

import './Home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adverts: [],
      filters: {},
      paginationFilters: PaginationFilters,
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

  /**
   * Guarda el tag en los filtros y busca los anuncios en funcion del tag que prefiera el usuario conectado
   */
  getAdvertsByUserTag = () => {
    const { tag } = this.props.user;
    this.setState({ filters: { tag } }, () => this.searchAdverts( { tag } ))
  };

  /**
   * Busca los anuncios en funcion de los filtros y el paginado
   */
  searchAdverts = async (_filters = undefined) => {
    const filters = _filters ? _filters : this.state.filters;
    const adverts = await API.listAdverts(filters, this.state.paginationFilters, this.source);

    if ( adverts ) {
      this.setState({ adverts });
      this.checkNextAdsPage(); // Compruebo siempre que busco si hay una página siguiente de anuncios
    }
  };

  /**
   * Comprueba si hay más anuncios en la siguiente página.
   * Este método es necesario ya que la API no nos ofrece un conteo, hay que sacarlo por nosotros mismos.
   */
  checkNextAdsPage = async () => {
    const { filters, paginationFilters: pagFilters } = this.state;
    pagFilters.page += 1;
    const adverts = await API.listAdverts(filters, pagFilters, this.source);
    pagFilters.page -= 1; // Deshacemos el cambio de la página

    // Si el API no responde para más anuncios o ya no hay más anuncios, bloqueamos el botón de la página siguiente
    pagFilters.disableNextPage = (!adverts || adverts.count === 0);
    this.setState({paginationFilters: pagFilters});
  };

  // Events

  onFiltered = filters => {
    this.setState( { filters, hasFiltered: true }, () => this.searchAdverts(filters) );
  };

  onPageChanged = paginationFilters => {
    this.setState( { paginationFilters }, () => {
      this.searchAdverts();
      this.checkNextAdsPage();
    });
  };

  render() {
    const { adverts, hasFiltered, paginationFilters } = this.state;
    const h1Message = hasFiltered ? `${adverts.count} adverts were found.` : `Adverts based on your favourite tag: `;
    
    return (
      <div>
        <React.Fragment>
          <Filters onSubmit={this.onFiltered} />
          <p className="results-message">{h1Message} <b>{!hasFiltered ? this.props.user.tag : ''}</b></p>
          <AdvertList adverts={adverts}/>
          <Pagination paginationFilters={paginationFilters} onPageChanged={this.onPageChanged} />
        </React.Fragment>
      </div>
    );
  }
}
