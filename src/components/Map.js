import React, { Component } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import { connect } from 'react-redux';


const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCqMt2G9OftUPNZV2VCne0pnB5VIJV2Ct8",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 47.6599, lng: -122.3099 }}
  >
    {props.isMarkerShown &&
      props.markers.map(marker => (
        <div>
            <Marker
              position={marker.position}
              onClick={props.onToggleOpen}
            >
              {props.isOpen && <InfoBox
                onCloseClick={props.onToggleOpen}
                options={{ closeBoxURL: ``, enableEventPropagation: true }}
              >
                <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                  <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                    Hello, Kaohsiung!
                  </div>
                </div>
              </InfoBox>}
            </Marker>
        </div>
      ))
    }
  </GoogleMap>
)



const mapStateToProps = (state) => ({
        markers : [{
          position: {
            lat: 47.6579,
            lng: -122.3079,
            name: 'Marker 1'
          }
        },
        {
          position: {
            lat: 47.6579,
            lng: -122.3159,
            name: 'Marker 2'
        }
      }]
    })

export default connect(mapStateToProps)(Map)
