import React from "react";
import Tags from "../Tags/Tags";

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        name: "",
        lowerPrice: "",
        greaterPrice: "",
        price: "",
        tag: "",
        selling: ""
      }
    };
  }

  onSubmit = evt => {
    evt && evt.preventDefault();

    let filters = this.formatPriceFilter();
    this.setState({ filters }, () => this.props.onSubmit(this.state.filters)); // Paso los filtros al Home para buscar los anuncios
  };

  formatPriceFilter = () => {
    const { lowerPrice, greaterPrice } = this.state.filters;

    let price = lowerPrice && lowerPrice.length && lowerPrice + "-";
    price +=
      greaterPrice &&
      greaterPrice.length &&
      (price.length ? "" : "-") + greaterPrice;

    let filters = this.state.filters;
    filters.price = price;

    return filters;
  };

  onInputChange = evt => {
    const { name, value } = evt.target;

    this.setState(({ filters }) => ({
      filters: {
        ...filters,
        [name]: value
      }
    }));
  };

  onRadioChange = evt => {
    const { id } = evt.target;

    let filters = this.state.filters;
    filters.selling = (id === 'sell-filter') + '';

    this.setState({filters});
  };

  onSelectChange = optionSelected => {
    let filters = this.state.filters;
    filters.tag = optionSelected;

    this.setState({ filters }, () => console.log(this.state.filters));
  };

  render() {
    const { name, lowerPrice, greaterPrice, selling } = this.state.filters;
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <p>Name</p>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Name"
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <p>Price</p>
          <input
            type="text"
            name="lowerPrice"
            id="lowerPrice"
            value={lowerPrice}
            placeholder="Lower Price"
            onChange={this.onInputChange}
          />
          <input
            type="text"
            name="greaterPrice"
            id="greaterPrice"
            value={greaterPrice}
            placeholder="Greater Price"
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <p>Tag</p>
          <Tags onTagSelected={this.onSelectChange} />
        </div>

        <div>
          <p>Advert type</p>

          <input
            type="radio"
            name="selling"
            value={selling}
            id="buy-filter"
            onChange={this.onRadioChange}
          />
          <label htmlFor="buy-filter">Buy</label>

          <input
            type="radio"
            name="selling"
            value={selling}
            id="sell-filter"
            onChange={this.onRadioChange}
          />
          <label htmlFor="sell-filter">Sell</label>
        </div>

        <button type="submit">Filtrar</button>
      </form>
    );
  }
}
