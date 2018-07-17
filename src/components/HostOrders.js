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
    console.log('hello')
    await this.props.getHostUser()
    console.log(this.props.hostAuth.user.id)
    this.props.fetchHost(this.props.hostAuth.user.id)
    console.log('HostOrders did mount')
  }

  render() {
    console.log('HostOrder')
    const shiftDown = {
      marginTop: '60px',
    }

    const {spaceId} = this.props.match.params

    // Need to make sure user is hostAuthorized, guest, and correct id
    // May not need to do correct id since not query paramter
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
