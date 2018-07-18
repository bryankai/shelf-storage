import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { submitSearch, setSearchString } from '../actions/spaces';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.props.setSearchString(address)
    this.props.history.push('/results')
  };

  render() {
    return (
      <div className='home-search-bar-container'>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search local spaces...',
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

const mapStateToProps = ({spaces}) => {
  return {spaces}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({submitSearch, setSearchString }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar))
