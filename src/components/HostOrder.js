import React, { Component }  from 'react';
import { Card, Col } from 'react-materialize'
import moment from 'moment'

class HostOrder extends Component {

  render() {
    const {
      // Order
      id, start_date, end_date, total_cost,
      // Guest
      first_name, avatar, email
    } = this.props.hostOrder

    const newStartDate = (moment(start_date).format("ddd, MMM D"))
    const newEndDate = (moment(end_date).format("ddd, MMM D YYYY"))
    const timeRange = `${newStartDate} - ${newEndDate}`

    return (
        <Col s={4} m={4} l={4} key={id}>
          <Card key={id} className=''
          >
            <div className='host-info center-center'>
              <img src={avatar} alt="Avatar" className="avatar-small"/>
              <div className='host-name center-center'>
                {first_name}
              </div>
            </div>
            <h6> {email} </h6>
            <h6> {timeRange} </h6>
            <h6> Total Cost: ${total_cost} </h6>
          </Card>
        </Col>
    )
  }
}

export default HostOrder
