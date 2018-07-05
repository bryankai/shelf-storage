import React, { Component }  from 'react';

class Space extends Component {

  render() {
    const {id, name, description, img_link, hosts_id, address, city, state, zip, temp_control, access, size, price, active, deleted_at
    } = this.props.space
    console.log(this.props.space)

    return (
      <div>
        <p>{this.props.space.name}</p>
      </div>
    )
  }
}

export default Space
