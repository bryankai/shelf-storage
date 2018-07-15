import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import { getUser } from '../actions/auth';
import { fetchHost } from '../actions/hosts';
import HostOrderList from './HostOrderList'
import '../styles/Reservations.css';

class HostOrders extends Component {

  componentDidMount = async () => {
    this.props.fetchHost(this.props.auth.user.id)
  }

  render() {
    const shiftDown = {
      margin: '70px',
    }

    const {spaceId} = this.props.match.params

    // Need to make sure user is authorized, guest, and correct id
    // May not need to do correct id since not query paramter
    if(!this.props.auth.authorized) {
      return <Redirect to="/"/>
    }

    return (
      <div style={shiftDown}>
        {/* <div className='image-splash' style={imageStyle}></div> */}
        <HostOrderList spaceId={spaceId}/>
      </div>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUser, fetchHost}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HostOrders)
