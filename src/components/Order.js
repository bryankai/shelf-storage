import React, { Component }  from 'react';
import {Card, CardTitle, Col} from 'react-materialize'
import moment from 'moment'

class Order extends Component {

  render() {
    const {
      // Order
      id, start_date, end_date, total_cost,
      // Space
      spaces_id, name, img_link, address, city, state, zip, lat, lng, size,
      // Host
      hosts_id, hostFirstName, hostLastName, hostAvatar
    } = this.props.order

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
      // <div style={containerStyle}>
        <Col s={12} m={12} l={9} key={id}>
          <Card key={id} className='orders-card horizontal'  header={<CardTitle image={img_link}></CardTitle>}
          // actions={[<a href={spacePageLink}>Space Details</a>]}
          >
            <div className='host-info center-center'>
              <img src={hostAvatar} alt="Avatar" className="avatar-small"/>
              <div className='host-name center-center'>
                {hostFirstName}
              </div>
            </div>
            <h5>{name}</h5>
            <p>{address}</p>
            <p>{city},{state} {zip}</p>
            <p>{size} sqft</p>
            <p> {timeRange} </p>
          </Card>
        </Col>
      // </div>
    )
  }
}

export default Order
