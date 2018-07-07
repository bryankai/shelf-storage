import React, { Component } from 'react';
import Map from './Map'


class MapContainer extends Component {
  state = {
    isMarkerShown: false,
  }



  componentDidMount() {
    this.delayedShowMarker()
  }

  // Delay on the Markers
  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 2000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <Map
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default MapContainer