import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Preloader, Row, Col} from 'react-materialize'
import { fetchOneSpace } from '../actions/spaces';
// import BookSpaceModal from './BookSpaceModal'
import BookPage from './BookPage'

import '../styles/SpacePage.css';


class SpacePage extends Component {

  componentDidMount = async () => {
    console.log(this.props.match.params)
    await this.props.fetchOneSpace(this.props.match.params.spaceId)
    // console.log(this.oneSpace.spaces)
  }

  render() {
    if(!this.props.oneSpace.spaces) {
      console.log('space page loading')
      return <div className='preloader'>
        <Preloader size='big'/>
      </div>
    }

    const {id, name, description, img_link, city, host_name, avatar, price, temp_control, access, size,
      // active, hosts_id, address, state, zip, deleted_at,
    } = this.props.oneSpace.spaces

    const imageStyle = {
      backgroundImage: `url(${img_link})`,
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
      height: '60vh',
      marginTop: '60px',
    }

    const hostStyle = {
      padding: '20px'
    }

    const titleRowStyle = {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }

    return (
      <div>
        <div className='image-splash' style={imageStyle}></div>
        <Row className='space-main'>
          <Col s={12} m={6} l={8} className='space-details'>
            <Row className='title-row' style={titleRowStyle}>
              <Col s={9} className="space-title">
                <h2>{name} </h2>
                <h4>{city}</h4>
                <Row className='detail-container'>
                  {temp_control?
                    <Col s={4}>
                    <p>Temp Controlled </p>
                    </Col>
                    : null }
                  <Col s={4}>
                    <p>Size: {size} sqft </p>
                  </Col>
                  {access?
                    <Col s={4}>
                      <p>24/7 Access</p>
                    </Col>
                  : null}
                </Row>
              </Col>
              <Col s={3} className='center-center' style={hostStyle}>
                <div className='host-details'>
                  <img src={avatar} alt="Avatar" className="avatar"/>
                  <h5>{host_name}</h5>
                </div>
              </Col>
            </Row>
            <Row>
              <h5>{description}</h5>
            </Row>
          </Col>
          <Col s={12} m={6} l={4} className='booking-col'>
            <BookPage space={{id, name, price}}/>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({spaces, oneSpace, auth}) => {
  return {spaces, oneSpace, auth}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchOneSpace}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SpacePage)
