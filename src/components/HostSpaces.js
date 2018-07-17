import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import { getHostUser } from '../actions/hostAuth';
import { fetchHost } from '../actions/hosts';
import HostSpaceList from './HostSpaceList'
import '../styles/Reservations.css';

class HostSpaces extends Component {

  componentDidMount = async () => {
    this.props.fetchHost(this.props.hostAuth.user.id)
  }

  render() {
    const shiftDown = {
      margin: '70px',
    }

    // Need to make sure user is authorized, guest, and correct id
    // May not need to do correct id since not query paramter
    if(!this.props.hostAuth.authorized) {
      return <Redirect to="/"/>
    }

    return (
      <div style={shiftDown}>
        <HostSpaceList/>
      </div>
    )
  }
}

const mapStateToProps = ({ hosts, hostAuth}) => {
  return {hosts, hostAuth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getHostUser, fetchHost}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HostSpaces)
