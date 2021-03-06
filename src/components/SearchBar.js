import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submitSearch } from '../actions/spaces';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
  componentDidMount(){
    if(this.props.spaces.searchString.length > 0){
      this.setState({address: this.props.spaces.searchString})
      this.handleSelect(this.props.spaces.searchString)
    }
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        return getLatLng(results[0])
      })
      .then(latLng => this.props.submitSearch(latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    const shiftDown = {
      marginTop: '64px',
      zIndex: '5'
    }
    return (
      <div className='search-bar-container' style={shiftDown}>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Spaces...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({spaces: state.spaces})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({submitSearch }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
