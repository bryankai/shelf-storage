import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Preloader} from 'react-materialize'
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
      console.log('fetchGuestOrders')
      this.props.fetchOrdersByGuestId(this.props.auth.user.id)
    }
  }

  render() {
    console.log(this.props.orders)
    if(this.props.orders.isLoading || !this.props.orders.orders)
      return <div className='preloader'>
        <Preloader size='big'/>
      </div>

    const Orders = this.props.orders.orders.map(order => {
      return <Order key={order.id} order={order}/>
    })

    const orderListStyle = {
      width: '80%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
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
