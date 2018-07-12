import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row} from 'react-materialize'
import Order from './Order'
import '../styles/Home.css';
import { getUser } from '../actions/auth';
import { fetchOrdersByGuestId } from '../actions/guests';

class OrderList extends Component {

  // Mounting Methods
  componentDidMount = async () => {
    // console.log('ORDER LIST',this.props.auth.user.id)
    // await this.props.getUser()
    console.log('OrderList did mount')
    if(this.props.auth.user.id) {
      console.log('fetch orders')
      this.props.fetchOrdersByGuestId(this.props.auth.user.id)
    }
  }

  render() {
    const Orders = this.props.orders.map(order => {
      return <Order key={order.id} order={order}/>
    })

    const orderListStyle = {
      display: 'flex',
      justifyContent: 'order-evenly',
      flexWrap: 'wrap'
    }

    return (
      <div>
        <h3> My Reservations </h3>
        <Row className="order-list-grid" style={orderListStyle}>
          {Orders}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({orders, auth}) => {
  return {orders, auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUser, fetchOrdersByGuestId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
