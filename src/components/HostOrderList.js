import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Preloader} from 'react-materialize'
import HostOrder from './HostOrder'
import '../styles/Home.css';
import { getUser } from '../actions/auth';
import { fetchAllOrdersBySpaceId } from '../actions/hosts';

class HostOrderList extends Component {



  // Mounting Methods
  componentDidMount = async () => {
    const spaceId = this.props.spaceId
    console.log('HostOrderList', spaceId)
    // console.log('ORDER LIST',this.props.auth.user.id)
    await this.props.getUser()
    console.log('HostOrderList did mount')

    if(this.props.auth.user.id) {
      console.log('fetchGuestOrders')
      this.props.fetchAllOrdersBySpaceId(this.props.auth.user.id, spaceId)
    }
  }

  render() {
    console.log(this.props.hostOrders)
    if(this.props.hostOrders.isLoading || !this.props.hostOrders.hostOrders)
      return <div className='preloader'>
        <Preloader size='big'/>
      </div>

    const hostOrders = this.props.hostOrders.hostOrders.map(hostOrder => {
      return <HostOrder key={hostOrder.id} hostOrder={hostOrder}/>
    })

    const orderListStyle = {
      width: '80%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }

    return (
      <div>
        <h3> Host Reservations  </h3>
        <Row className="order-list-grid" style={orderListStyle}>
          {hostOrders}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({hostOrders, auth}) => {
  return {hostOrders, auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUser, fetchAllOrdersBySpaceId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HostOrderList)
