import React from "react";
import axios from "axios";

import * as API from "../../services/APIService";
import Tags from "../Tags/Tags";

// Este componente se encarga de manejar la creación y la edición de un anuncio
export default class EditAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.resetAdvertCreationState();
  }

  // Cancela cualquier peticion que no se haya podido completar debido a que el componente se haya desmontado
  source = axios.CancelToken.source();

  // Estaría bien cambiar este método por 'static getDerivedStateFromProps(props, state)'
  UNSAFE_componentWillReceiveProps() {
    this.setState(this.resetAdvertCreationState());
  }

  componentDidMount() {
    this.fillFieldsIfEditingAdvert();
  }

  componentWillUnmount() {
    this.source.cancel('EditAdvert component');
  }

  resetAdvertCreationState = () => {
    return {
      advert: {
        name: "",
        price: "",
        description: "",
        photo: "",
        tags: [],
        type: ""
      },
      editingAdvert: false
    };
  };

  fillFieldsIfEditingAdvert = async () => {
    const { pathname } = this.props.location;

    const splittedPathname = pathname.split("/");
    // Compruebo si estoy en el pathname de actualizar
    if (splittedPathname[1].includes("edit-advert")) {
      // Compruebo si el id que me pasan es válido.
      const result = await API.getAdvertById(splittedPathname[2], this.source);
      if (result.success) {
        const advert = result.result;
        this.setState({ advert, editingAdvert: true });
      }
    }
  };

  onSubmit = async evt => {
    evt && evt.preventDefault();

    const { advert, editingAdvert } = this.state;
    const { success, result } = editingAdvert ? await API.updateAdvert(advert, this.source) : await API.createAdvert(advert, this.source);

    if ( success ) {
      this.props.history.push(`/advert/${result.id}?edit=true`);
      return;
    }

    // TODO: Show error toast    
  };

  onInputChange = evt => {
    const { name, value } = evt.target;
    this.updateState(name, value);
  };

  onRadioChange = evt => {
    const { id } = evt.target;
    this.updateState("type", id);
  };

  onSelectChange = selectedTags => {
    this.updateState("tags", selectedTags);
  };

  updateState = (name, value) => {
    this.setState(({ advert }) => ({
      advert: {
        ...advert,
        [name]: value
      }
    }));
  };

  render() {
    const { name, price, description, photo, tags, type } = this.state.advert;
    const updateOrCreateAdvert = this.state.editingAdvert ? 'Update advert' : 'Create advert';
    const photoFieldType = this.state.editingAdvert ? 'text' : 'url';
    return (
      <React.Fragment>
        <h1>{updateOrCreateAdvert}</h1>
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
            <textarea
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
            <Tags multiple={true} selectedTags={tags} onTagSelected={this.onSelectChange} />
          </div>

          <div>
            <p>Advert type</p>

            <input
              type="radio"
              name="type"
              value={type}
              checked={type === 'buy'}
              id="buy"
              onChange={this.onRadioChange}
            />
            <label htmlFor="buy">Buy</label>

            <input
              type="radio"
              name="type"
              value={type}
              checked={type === 'sell'}
              id="sell"
              onChange={this.onRadioChange}
            />
            <label htmlFor="sell">Sell</label>
          </div>

          <div>
            <p>Photo</p>
            <input
              type={photoFieldType}
              name="photo"
              id="photo"
              value={photo}
              placeholder="URL of your advert photo"
              onChange={this.onInputChange}
            />
          </div>

          <button type="submit">{updateOrCreateAdvert}</button>
        </form>
      </React.Fragment>
    );
  }
}
