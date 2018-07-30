import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import { getHostUser } from '../actions/hostAuth';
import { fetchHost } from '../actions/hosts';
import HostOrderList from './HostOrderList'
import '../styles/Reservations.css';

class HostOrders extends Component {

  componentDidMount = async () => {
    await this.props.getHostUser()
    this.props.fetchHost(this.props.hostAuth.user.id)
  }

  render() {
    const shiftDown = {
      marginTop: '60px',
    }
    const {spaceId} = this.props.match.params

    if(!this.props.hostAuth.authorized) {
      return <Redirect to="/"/>
    }

    return (
      <div style={shiftDown}>
        <HostOrderList spaceId={spaceId}/>
      </div>
    )
  }
}

const mapStateToProps = ({hostAuth}) => {
  return {hostAuth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getHostUser, fetchHost}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HostOrders)
