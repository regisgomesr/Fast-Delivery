import React, { Component } from 'react'
import './InputPlacesAutocomplete.css'
import PlacesAutocomplete from 'react-places-autocomplete';

export class InputPlacesAutocomplete extends Component {
  constructor(props) {
    super(props);
      this.state = {
        address: '',
      }
  }
 
  handleChangeAddressStart = (address) => {
    this.setState({ address });
    this.props.changeAddressCallback(address);
  };

  handleChangeAddressDestination = (address) => {
    this.setState({ address });
    this.props.changeAddressCallback(address);
  };
 
  render() {
    console.log(this.state.address);
    return (
    <>
      <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChangeAddressStart, this.handleChangeAddressDestination}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            type='text'
            value={this.state.address}
            onChange={this.handleChangeAddress}
            {...getInputProps({
              placeholder: 'Search Places ...',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              
              const style = suggestion.active
                ? { backgroundColor: '#42a5f5', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div className="input-suggestion"
                  {...getSuggestionItemProps(suggestion, {
                    style,
                  })}
                >
                <i className="material-icons">location_on  </i> <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
        )}
      </PlacesAutocomplete>
    </>
    )
  }
}

export default InputPlacesAutocomplete
