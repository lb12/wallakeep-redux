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
            tags.map( tag => <option key={tag} value={tag}>{tag}</option>) 
        );
    }

    onChange = evt => {
        const selectedIndex = evt.target.selectedIndex - 1; // Descontar el 'Select a tag'  
        const selectedTag = this.state.tags[ selectedIndex ];

        this.props.onTagSelected(selectedTag);
    }

    onMultipleChange = evt => {
        let selectedTags = ([...evt.target.options].filter(options => options.selected).map( option => option.value ));
        this.props.onTagSelected(selectedTags);
    }

    render(){
        const { tags } = this.state;
        return (
            <div>
                {
                tags
                &&
                !this.props.multiple
                &&
                <select defaultValue="DEFAULT" onChange={this.onChange}>
                    <option value="DEFAULT" disabled>Select a tag</option>
                    { this.renderTags(tags) }
                </select>
                }
                {
                tags
                &&
                this.props.multiple
                &&
                <select multiple onChange={this.onMultipleChange}>
                    { this.renderTags(tags) }
                </select>
                }
            </div>
        );
    }
}