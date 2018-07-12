import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Button, Row, Col} from 'react-materialize'
import { getUser } from '../actions/auth';
import { fetchGuest } from '../actions/guests';
import { fetchOrdersByGuestId } from '../actions/guests';
import { withAuthentication } from '../helper/helper';

import OrderList from './OrderList'

class GuestReservations extends Component {
  //
  componentDidMount = async () => {
    // await this.props.getUser()
    // console.log('USER ID', this.props.auth.user.id)
    // this.props.fetchGuest(this.props.auth.user.id)
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
      <div style={shiftDown}>
      {this.props.auth.authorized
        ? <OrderList/>
        :null}
      </div>
    )
  }
}

const mapStateToProps = ({guest, auth}) => {
  return {auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUser, fetchGuest}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestReservations)
