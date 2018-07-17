import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Preloader} from 'react-materialize'
import HostOrder from './HostOrder'
import '../styles/Home.css';
import { getHostUser } from '../actions/hostAuth';
import { fetchAllOrdersBySpaceId } from '../actions/hosts';
import { fetchOneSpace } from '../actions/spaces';


class HostOrderList extends Component {



  // Mounting Methods
  componentDidMount = async () => {
    const spaceId = this.props.spaceId
    console.log('HostOrderList', spaceId)
    await this.props.getHostUser()
    console.log('HostOrderList did mount')

    if(this.props.hostAuth.user.id) {
      this.props.fetchAllOrdersBySpaceId(this.props.hostAuth.user.id, spaceId)
      // this.props.fetchOneSpace(spaceId)
    }
  }

  render() {
    console.log(this.props.hostOrders)
    if(this.props.hostOrders.isLoading || !this.props.hostOrders.hostOrders || space)
      return <div className='preloader'>
        <Preloader size='big'/>
      </div>

    const space = this.props.hostOrders.hostOrders.find(hostOrder => {
      console.log(hostOrder.spaces_id, this.props.spaceId)
      return hostOrder.spaces_id == this.props.spaceId
    })
    console.log(this.props.spaceId);
    console.log(space)
    const hostOrders = this.props.hostOrders.hostOrders.map(hostOrder => {
      console.log(hostOrder)
      return <HostOrder key={hostOrder.id} hostOrder={hostOrder}/>
    })

    const orderListStyle = {
      width: '80%',
      display: 'flex',
      justifyContent: 'center',
    }

    // if(space) {
      const imageStyle = {
        backgroundImage: `url(${(space ? space.img_link : "")})`,
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        height: '60vh'
      }
    // }

    return (
      <div>
        <div className='image-splash' style={imageStyle ? imageStyle : ""}></div>
        <h3> Orders for '{space ? space.name : ""}' </h3>
        <Row className="order-list-grid" style={orderListStyle}>
          {hostOrders.length>0
            ? hostOrders
            : <h5>No Orders Found</h5>}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({hostOrders, hostAuth, spaces}) => {
  return {hostOrders, hostAuth, spaces}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getHostUser, fetchAllOrdersBySpaceId, fetchOneSpace}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HostOrderList)
