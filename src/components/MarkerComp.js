import React, { Component } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux';


class MarkerComp extends Component {

  render() {
    return (
      <Marker
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default MarkerComp
