import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Button, Row, Col} from 'react-materialize'

import { fetchGuest } from '../actions/guests';
import { fetchOrdersByGuestId } from '../actions/guests';

import OrderList from './OrderList'

class GuestReservations extends Component {
  //
  componentDidMount = async () => {
    this.props.fetchGuest(1)
    // this.props.fetchGuest(this.props.auth.user.id)
    await this.props.fetchOrdersByGuestId(1)
    // replace 1 with this.props.auth.user.id
    console.log('orders', this.props.orders)
  }
  //
  render() {
  //
  //   const hostStyle = {
  //     padding: '20px'
  //   }
  //
  //   const titleRowStyle = {
  //     display: 'flex',
  //     justifyContent: 'space-evenly',
  //     alignItems: 'center'
  //   }
    const shiftDown = {
      margin: '70px',
    }
    
    return (
      <div>
      <Row style={shiftDown}>
        <OrderList/>
      </Row>
      </div>
    )
  }
}

const mapStateToProps = ({guest, auth}) => {
  return { auth}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchGuest, fetchOrdersByGuestId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestReservations)
