import React from "react";

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        name: "",
        price: "",
        tag: "",
        type: ""
      }
    };
  }

  onSubmit = evt => {
    evt && evt.preventDefault();
    this.props.onSubmit(this.state.filters); // Paso los filtros al Home para buscar los anuncios
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

  render() {
    const { name, price, tag, type } = this.state.filters;
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
            name="price"
            id="price"
            value={price}
            placeholder="Price"
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <p>Tag</p>
          <input
            type="text"
            name="tag"
            id="tag"
            value={tag}
            placeholder="Tag"
            onChange={this.onInputChange}
          />
        </div>

        <div>
          <p>Type</p>
          <input
            type="text"
            name="type"
            id="type"
            value={type}
            placeholder="Type"
            onChange={this.onInputChange}
          />
        </div>

        <button type="submit">Filtrar</button>
      </form>
    );
  }
}
