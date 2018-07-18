import React, { Component }  from 'react';
import { Card, Col } from 'react-materialize'
import moment from 'moment'

class HostOrder extends Component {

  render() {
    console.log('HostOrder props',this.props.hostOrder)
    const {
      // Order
      id, start_date, end_date, total_cost,
      // Space
      spaces_id,
      // Guest
      first_name, avatar, email
    } = this.props.hostOrder

    const containerStyle = {
      display: 'flex',
      justifyContent: 'center'
    }

    const truncateString = (text, length=60) => {
      const maxLength = length;
      const trimmedString = text.substring(0, maxLength);
      return text.length<=maxLength ? text : `${trimmedString}...`
    }

    const spacePageLink = `/spaces/${spaces_id}`
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
