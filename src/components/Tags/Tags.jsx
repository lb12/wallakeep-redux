import React from 'react';
import * as API from '../../services/APIService';


export default class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }

        this.getTags();
    }

    getTags = async () => {
        const tags = await API.getTags();
        this.setState({tags});
    } 

    renderTags = tags => {
        return (
            tags.map( tag => <option>{tag}</option>) 
        );
    }

    onChange = evt => {
        const selectedIndex = evt.target.selectedIndex - 1; // Descontar el 'Select a tag'  
        const tagSelected = this.state.tags[ selectedIndex ];

        this.props.onTagSelected(tagSelected);
    }

    render(){
        const { tags } = this.state;
        return (
            <div>
                {
                tags
                &&
                <select name="" id="" onChange={this.onChange}>
                    <option selected disabled>Select a tag</option>
                    { this.renderTags(tags) }
                </select>
                }
            </div>
        );
    }
}