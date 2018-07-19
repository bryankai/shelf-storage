import React, { Component }  from 'react';
import { Link } from 'react-router-dom'
import { Card, CardTitle, Col } from 'react-materialize'
import moment from 'moment'

class Order extends Component {

  render() {
    const {
      // Order
      id, start_date, end_date, total_cost,
      // Space
      spaces_id, name, img_link, address, city, state, zip, size,
      // Host
      hostFirstName, hostAvatar
    } = this.props.order

    const spacePageLink = `/spaces/${spaces_id}`
    const newStartDate = (moment(start_date).format("ddd, MMM D"))
    const newEndDate = (moment(end_date).format("ddd, MMM D YYYY"))
    const timeRange = `${newStartDate} - ${newEndDate}`

    return (
      // <div style={containerStyle}>
        <Col s={12} m={12} l={12} key={id}>
          <Card key={id} className='orders-card horizontal'  header={<CardTitle image={img_link}></CardTitle>}
          // actions={[<a href={spacePageLink}>Space Details</a>]}
          >
            <div className='host-info center-center'>
              <img src={hostAvatar} alt="Avatar" className="avatar-small"/>
              <div className='host-name center-center'>
                {hostFirstName}
              </div>
            </div>
            <h5><Link to={spacePageLink} >{name}</Link></h5>
            <h6> {timeRange} </h6>
            <p>{address}</p>
            <p>{city},{state} {zip}</p>
            <h6>{size} sqft</h6>
            <h6> Total Cost: ${total_cost} </h6>
          </Card>
        </Col>
      // </div>
    )
  }
}

export default Order
