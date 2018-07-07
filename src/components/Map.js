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
      console.log('onToggleOpen')
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
    defaultZoom={13}
    // Old center
    defaultCenter={{ lat: 47.6599, lng: -122.3099 }}
    // New Dynamic Center
    // defaultCenter={props.location}
  >
    {props.isMarkerShown &&
      props.spaces.map((space, id) => {
        const position = {lat: space.lat, lng: space.lng}
        console.log(props.location, props.spaces)
        return (
          <Marker
            key={id}
            position={position}
            // onMouseOver={() => props.onToggleOpen(id)}
            // onMouseLeave={() => props.onToggleOpen(id)}
            // onMouseEnter={() => console.log('enter')}
            onClick={() => props.onToggleOpen(id)}
            >
              {props.isOpen[id] && <InfoWindow onCloseClick={()=>props.onToggleOpen(id)}>
                <p>{space.name}</p>
              </InfoWindow>}
            </Marker>
          )
      }
    )
    }
  </GoogleMap>
)

const mapStateToProps = ({spaces, location}) => {
  return {spaces, location}
}

export default connect(mapStateToProps)(Map)
