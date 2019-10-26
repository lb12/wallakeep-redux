import React from "react";
import axios from "axios";

import * as API from '../../services/APIService';
import Advert from "../Advert/Advert";

import './AdvertDetail.css';
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default class AdvertDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      advert: null,
      advertError: false
    }

    const advertId = this.props.match.params.id;
    advertId && this.getAdvert(advertId);
  }


  // Cancela cualquier peticion que no se haya podido completar debido a que el componente se haya desmontado
  source = axios.CancelToken.source();

  componentWillUnmount() {
    this.source.cancel('AdvertDetail component');
  }

  getAdvert = async advertId => {
    let advert = await API.getAdvertById(advertId, this.source);

    if ( !advert || !advert.success) {
      this.setState({ advertError: true });
      return;
    }
    
    advert = advert.result;
    this.setState({ advert });
  };

  editAdvert = () => {
    const { advert } = this.state;
    this.props.history.push(`/edit-advert/${advert.id}`);
  };

  render() {
    const { advert, advertError } = this.state;
    return (
      <React.Fragment>
        {
          !advertError && advert ?
          <div className="detail">
            <Advert advert={advert} />
            <button className="btn btn-primary edit-ad-submit-btn" onClick={this.editAdvert}>Edit advert</button>
          </div>
          :
          <NotFoundPage />
        }
      </React.Fragment>
    );
  }
}
