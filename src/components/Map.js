import React from "react";
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { connect } from "react-redux";
// import MarkerComp from './MarkerComp'

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCqMt2G9OftUPNZV2VCne0pnB5VIJV2Ct8",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers(
    () => ({
      isOpen: {},
    }),
    {
      onToggleOpen:
        ({ isOpen }) =>
        (id) => {
          if (isOpen.hasOwnProperty(id)) {
            return { isOpen: { ...isOpen, [id]: !isOpen[id] } };
          } else {
            return { isOpen: { ...isOpen, [id]: true } };
          }
        },
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={12}
    // Dynamic center based on search location
    center={props.searchLocation || { lat: 47.6599, lng: -122.3099 }}
  >
    {props.isMarkerShown &&
      props.spaces.spaces.map((space, id) => {
        const position = { lat: space.lat, lng: space.lng };
        return (
          <Marker
            key={id}
            position={position}
            onClick={() => props.onToggleOpen(id)}
          >
            {props.isOpen[id] && (
              <InfoWindow onCloseClick={() => props.onToggleOpen(id)}>
                <div>{space.name}</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
  </GoogleMap>
));

const mapStateToProps = ({ spaces, searchLocation }) => {
  return { spaces, searchLocation };
};

export default connect(mapStateToProps)(Map);
