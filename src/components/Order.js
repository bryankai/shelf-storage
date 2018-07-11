import React, { Component }  from 'react';
import {Card, CardTitle, Col} from 'react-materialize'

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
    console.log('Order',this.props.order)

    const imgCropStyle = {
      height: '100%',
      width: '100%'
      // overflow: 'hidden',
      // display: 'flex',
      // justifyContent: 'center'
    }

    const truncateString = (text, length=60) => {
      const maxLength = length;
      const trimmedString = text.substring(0, maxLength);
      return text.length<=maxLength ? text : `${trimmedString}...`
    }

    const spacePageLink = `/spaces/${spaces_id}`

    return (
      <div>
        {/* <Col s={6} m={12} l={4} xl={3}>
          <p>{this.props.order.name}</p>
        </Col> */}
        <Col m={7} s={12}>
          <Card className='horizontal'  header={<CardTitle image={img_link}></CardTitle>} actions={[<a href={spacePageLink}>Space Details</a>]}>
            <h4>{name}</h4>
            <p>{address} {city},{state} {zip}</p>
            <p>{start_date} - {end_date}</p>


          </Card>
        </Col>
      </div>
    )
  }
}

export default Order
