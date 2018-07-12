import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row} from 'react-materialize'
import Order from './Order'
import '../styles/Home.css';

import { fetchOrdersByGuestId } from '../actions/guests';

class OrderList extends Component {

  // Mounting Methods
  componentDidMount = () => {
    this.props.fetchOrdersByGuestId()
  }

  render() {
    const Orders = this.props.orders.map(order => {
      return (
        <Order key={order.id} order={order}/>
      )
    })

    const orderListStyle = {
      display: 'flex',
      justifyContent: 'order-evenly',
      flexWrap: 'wrap'
    }

    return (
      <Row className="order-list-grid" style={orderListStyle}>
        {Orders}
      </Row>
    )
  }
}

const mapStateToProps = ({orders, auth}) => {
  return {orders, auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchOrdersByGuestId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
