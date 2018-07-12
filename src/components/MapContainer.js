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
    }, 1000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <div id='map-container'>
        <Map
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
      </div>
    )
  }
}

export default MapContainer
