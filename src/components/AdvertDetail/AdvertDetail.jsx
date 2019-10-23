import React from "react";

import * as API from '../../services/APIService';

export default class AdvertDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      advert: null
    }

    const advertId = this.props.match.params.id;
    this.getAdvert(advertId);
  }

  getAdvert = async advertId => {
    let advert = await API.getAdvertById(advertId);
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
      <div>
        {
          advert
          &&
          <div>
            <h1>{advert.name}</h1>
            <p>{advert.description}</p>
            <p>{advert.price} €</p>
            <p>{advert.type}</p>
            <div>
              {advert.tags.map( tag => <span key={tag} className={`badge badge-${tag}`}>{tag} </span>)}
            </div>
            <img src={advert.photo} alt={`${advert.name}_advert_img`} />
            <button onClick={this.editAdvert}>Edit advert</button>
          </div>
        }
      </div>
    );
  }
}
