import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Preloader} from 'react-materialize'
import HostOrder from './HostOrder'
import '../styles/Home.css';
import { getHostUser } from '../actions/hostAuth';
import { fetchAllOrdersBySpaceId } from '../actions/hosts';

class HostOrderList extends Component {



  // Mounting Methods
  componentDidMount = async () => {
    const spaceId = this.props.spaceId
    console.log('HostOrderList', spaceId)
    // console.log('ORDER LIST',this.props.hostAuth.user.id)
    await this.props.getHostUser()
    console.log('HostOrderList did mount')

    if(this.props.hostAuth.user.id) {
      this.props.fetchAllOrdersBySpaceId(this.props.hostAuth.user.id, spaceId)
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
    }

    const imageStyle = {
      backgroundImage: `url(${this.props.hostOrders.hostOrders[0].img_link})`,
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
      height: '60vh'
    }

    return (
      <div>
        <div className='image-splash' style={imageStyle}></div>
        <h3> Orders for '{this.props.hostOrders.hostOrders[0].name}' </h3>
        <Row className="order-list-grid" style={orderListStyle}>
          {hostOrders}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({hostOrders, hostAuth}) => {
  return {hostOrders, hostAuth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getHostUser, fetchAllOrdersBySpaceId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HostOrderList)
