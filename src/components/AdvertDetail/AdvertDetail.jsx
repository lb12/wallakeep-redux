import React from "react";
import axios from "axios";

import * as API from '../../services/APIService';
import Advert from "../Advert/Advert";

import './AdvertDetail.css';

export default class AdvertDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      advert: null
    }

    const advertId = this.props.match.params.id;
    this.getAdvert(advertId);
  }


  // Cancela cualquier peticion que no se haya podido completar debido a que el componente se haya desmontado
  source = axios.CancelToken.source();

  componentWillUnmount() {
    this.source.cancel('AdvertDetail component');
  }

  getAdvert = async advertId => {
    let advert = await API.getAdvertById(advertId, this.source);
    console.log(advert)
    if (!advert.success) {
      this.props.history.push("/404");
    } else {
      advert = advert.result;
      this.setState({ advert });
    }
  };

  editAdvert = () => {
    const { advert } = this.state;
    this.props.history.push(`/edit-advert/${advert.id}`);
  };

  render() {
    const { advert } = this.state;
    return (
      <React.Fragment>
        {
          advert
          &&
          <div className="detail">
            <Advert advert={advert} />
            <button className="btn btn-primary edit-ad-submit-btn" onClick={this.editAdvert}>Edit advert</button>
          </div>
        }
      </React.Fragment>
    );
  }
}
