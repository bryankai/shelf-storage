import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Preloader, Button} from 'react-materialize'
import HostSpace from './HostSpace'
import '../styles/Home.css';
import { getHostUser } from '../actions/hostAuth';
import { fetchAllSpacesByHostId } from '../actions/hosts';

class HostSpaceList extends Component {

  // Mounting Methods
  componentDidMount = async () => {
    await this.props.getHostUser()
    if(this.props.hostAuth.user.id) {
      this.props.fetchAllSpacesByHostId(this.props.hostAuth.user.id)
    }
  }

  render() {
    // Preloader
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
          <Col s={12} m={12} l={12}>
              <Button floating large className='red large-margin' waves='light' icon='add' />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({hostSpaces, hostAuth}) => {
  return {hostSpaces, hostAuth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getHostUser, fetchAllSpacesByHostId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HostSpaceList)
