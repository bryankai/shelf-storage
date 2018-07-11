import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Button, Row, Col} from 'react-materialize'

class GuestProfile extends Component {

  componentDidMount = () => {
    this.props.fetchGuest(guestId)
    this.props.fetchOrders(guestId)
  }

  render() {

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
        <Row className='space-main'>
          <Col s={12} m={6} l={8} className='space-details'>
            <Row className='title-row' style={titleRowStyle}>
              <Col s={3} className='center-center' style={hostStyle}>
                <div className='host-details'>
                  <img src={avatar} alt="Avatar" className="avatar"/>
                  <h5>{host_name}</h5>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({spaces, auth}) => {
  return { auth}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchOneSpace}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestProfile)
