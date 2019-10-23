import React from "react";

import * as API from '../../services/APIService';
import Tags from "../Tags/Tags";

// Este componente se encarga de manejar la creación y la edición de un anuncio
export default class EditAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: {
        name: '',
        price: '',
        description: '',
        photo: '',
        tags: [],
        type: ''
      }
    };
  }

  onSubmit = evt => {
    evt && evt.preventDefault();
    console.log(this.state);
  }

  onInputChange = evt => {
    const { name, value } = evt.target;
    this.updateState(name, value);
  };

  onRadioChange = evt => {
    const { id } = evt.target;
    this.updateState('type', id);
  };

  onSelectChange = selectedTags => {
    console.log(selectedTags);
    this.updateState('tags', selectedTags);
  };

  updateState = ((name, value) => {
    this.setState(({ advert }) => ({
      advert: {
        ...advert,
        [name]: value
      }
    }));
  });

  render() {
      const { name, price, description, photo, type } = this.state.advert;
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
          <p>Description</p>
          <input
            type="textarea"
            name="description"
            id="description"
            value={description}
            placeholder="Write a description of the product"
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <p>Price</p>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            placeholder="Price"
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <p>Tag</p>
          <Tags multiple={true} onTagSelected={this.onSelectChange} />
        </div>

        <div>
          <p>Advert type</p>

          <input
            type="radio"
            name="type"
            value={type}
            id="buy"
            onChange={this.onRadioChange}
          />
          <label htmlFor="buy">Buy</label>

          <input
            type="radio"
            name="type"
            value={type}
            id="sell"
            onChange={this.onRadioChange}
          />
          <label htmlFor="sell">Sell</label>
        </div>
        <div>
          <p>Photo</p>
          <input
            type="file"
            name="photo"
            id="photo"
            value={photo}
            onChange={this.onInputChange}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}
