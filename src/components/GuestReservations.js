import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import { getUser } from '../actions/auth';
import { fetchGuest } from '../actions/guests';
import OrderList from './OrderList'
import '../styles/Reservations.css';

class GuestReservations extends Component {

  componentDidMount = async () => {
    this.props.fetchGuest(this.props.auth.user.id)
  }

  render() {
    const shiftDown = {
      margin: '70px',
    }

    if(!this.props.auth.authorized) {
      return <Redirect to="/"/>
    }

    return (
      <div style={shiftDown}>
        <OrderList/>
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
