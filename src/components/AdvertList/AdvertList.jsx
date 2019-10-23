import React from "react";

import Advert from '../Advert/Advert';
import Pagination from "../Pagination/Pagination";

export default class AdvertList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  buildAdvertList = adverts => {
    return (
      <div className="row">
        {
          adverts.map(advert => <Advert key={advert.id} advert={advert} />)
        }
      </div>
    )
  };

  render() {
    const adverts = this.props.adverts.results;
    return (
      <div>
        {
          adverts
          &&
          adverts.length
          && 
          this.buildAdvertList(adverts)
        }

        <Pagination />
      </div>
    );
  }
}
