import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Preloader} from 'react-materialize'
import HostSpace from './HostSpace'
import '../styles/Home.css';
import { getUser } from '../actions/auth';
import { fetchAllSpacesByHostId } from '../actions/hosts';

class HostSpaceList extends Component {

  // Mounting Methods
  componentDidMount = async () => {
    await this.props.getUser()
    console.log('HostSpaceList did mount')
    if(this.props.auth.user.id) {
      console.log(this.props.auth.user.id)
      this.props.fetchAllSpacesByHostId(this.props.auth.user.id)
    }
  }

  render() {
    console.log(this.props)
    // and check that user is a host
    if(this.props.hostSpaces.isLoading || !this.props.hostSpaces.hostSpaces)
      return <div className='preloader'>
        <Preloader size='big'/>
      </div>

    const HostSpaces = this.props.hostSpaces.hostSpaces.map(hostSpace => {
      return <HostSpace key={hostSpace.id} hostSpace={hostSpace}/>
    })

    const hostSpaceListStyle = {
      width: '80%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }

    return (
      <div>
        <h3> My Spaces </h3>
        <Row className="hostSpace-list-grid" style={hostSpaceListStyle}>
          {HostSpaces}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({hostSpaces, auth}) => {
  return {hostSpaces, auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUser, fetchAllSpacesByHostId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HostSpaceList)
