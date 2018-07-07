import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col} from 'react-materialize'
import { fetchOneSpace } from '../actions/spaces';
import BookSpaceModal from './BookSpaceModal'

import '../styles/SpacePage.css';


class SpacePage extends Component {

  componentDidMount = () => {
    console.log(this.props.match.params)
    this.props.fetchOneSpace(this.props.match.params.spaceId)
  }

  render() {
    console.log(this.props)
    const {name, description, img_link, city, host_name, avatar, price,
    // temp_control, access, size,  active,
    // id, hosts_id, address, state, zip, deleted_at,
    } = this.props.spaces

    const imageStyle = {
      backgroundImage: `url(${img_link})`,
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
      height: '40vh'
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
        <div className='space-main'>
          <div className='space-details'>
            <Row className='title-row' style={titleRowStyle}>
              <Col s={9} className="space-title">
                <h2>{name} </h2>
                <h4>{city}</h4>
                <h5>${price} per month </h5>
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
            <Row>
              {/* <Button waves='light'
                onClick={() => {$('#foo').modal('open')}}>Book
              </Button> */}
              <BookSpaceModal space={{name, price}}/>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({spaces, auth}) => {
  return {spaces, auth}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchOneSpace}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SpacePage)
