import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux';
// import MarkerComp from './MarkerComp'

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCqMt2G9OftUPNZV2VCne0pnB5VIJV2Ct8",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: {},
  }), {
    onToggleOpen: ({ isOpen }) => (id) => {
      if(isOpen.hasOwnProperty(id)){
        return { isOpen: {...isOpen, [id]:!isOpen[id] } }
      }
      else {
        return { isOpen: {...isOpen, [id]:true } }
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 47.6599, lng: -122.3099 }}
  >
    {props.isMarkerShown &&
      props.markers.map((marker, id) => (
          <Marker
            key={id}
            position={marker.position}
            // onMouseEnter={() => props.onToggleOpen(id)}
            // onMouseLeave={() => props.onToggleOpen(id)}
            onClick={() => props.onToggleOpen(id)}
          >
            {props.isOpen[id] && <InfoWindow onCloseClick={()=>props.onToggleOpen(id)}>
              <p>{marker.name}</p>
            </InfoWindow>}
          </Marker>
      ))
    }
  </GoogleMap>
)

const mapStateToProps = (state) => ({
        markers : [{
          position: {
            lat: 47.6579,
            lng: -122.3079},
          name: 'Marker 1',
        },
        {
          position: {
            lat: 47.6579,
            lng: -122.3159},
          name: 'Marker 2'
      }]
    })

export default connect(mapStateToProps)(Map)
