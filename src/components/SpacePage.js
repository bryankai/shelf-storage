import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOneSpace } from '../actions/spaces';

class SpacePage extends Component {

  componentDidMount = () => {
    this.props.fetchOneSpace()
  }

  render() {
    const {id, name, description, img_link, hosts_id, address, city, state, zip, temp_control, access, size, price, active, deleted_at
    } = this.props.space

    return (
      <div>
        <p>{name}</p>
      </div>
    )
  }
}

const mapStateToProps = ({spaces, auth}) => {
  return {spaces, auth}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchOneSpace}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SpacePage)
