import React, { useState, useEffect } from "react";
import axios from "axios";

import Advert from "../Advert";
import NotFoundPage from "../NotFoundPage";
import './AdvertDetail.css';

function AdvertDetail(props) {
  const [advert, setAdvert] = useState(null);
  const source = axios.CancelToken.source();
  const advertId = props.match.params.id;

  useEffect(() => {
    const getAdvert = async () => {
      if (advertLoaded()) return;
      await props.loadAdvert(advertId, source); // API.getAdvertById(advertId, source);
      let _advert = props.advert; 
      
      if ( !_advert || !_advert.success ) return;
      
      _advert = _advert.result;
      setAdvert(_advert);
    };
    
    getAdvert();
    
    return function cleanup() {
      // Cancela cualquier peticion que no se haya podido completar debido a que el componente se haya desmontado
      source.cancel('AdvertDetail component');
    }
  }, [advert]);
  
  const advertLoaded = () => (Object.entries(props.advert).length > 0 && props.advert.result.id === advertId);

  const editAdvert = () => {
    props.history.push(`/edit-advert/${advertId}`);
  };

  return (
    <React.Fragment>
      {
        advertLoaded() ?
        <div className="detail">
          <Advert advert={props.advert.result} />
          <button className="btn btn-primary edit-ad-submit-btn" onClick={editAdvert}>Edit advert</button>
        </div>
        :
        <NotFoundPage />
      }
    </React.Fragment>
  );
}

export default AdvertDetail;


/* 

// NOTA: Dejo el componente que habia antes de refactorizarlo con hooks.

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
*/