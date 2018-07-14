import React, { Component }  from 'react';
import { Link } from 'react-router-dom'
import { Card, CardTitle, Col } from 'react-materialize'
import moment from 'moment'

class HostSpace extends Component {

  render() {
    const {
      // Space
      id, name, description, img_link, address, city, state, zip, lat, lng, size,

    } = this.props.hostSpace

    const containerStyle = {
      display: 'flex',
      justifyContent: 'center'
    }

    // Issue with this link directing to /host/host/spaces... or /spaces, but not host/spaces...
    const spaceOrdersLink = `host/spaces/${id}/reservations`
    const spacePageLink = `/spaces/${id}`

    const truncateString = (text, length=60) => {
      const maxLength = length;
      const trimmedString = text.substring(0, maxLength);
      return text.length<=maxLength ? text : `${trimmedString}...`
    }

    return (
      // <div style={containerStyle}>
        <Col s={12} m={12} l={12} key={id}>
          <Card key={id} className='orders-card horizontal'  header={<CardTitle image={img_link}></CardTitle>}
          >
            <h5><Link to={spaceOrdersLink} >{name}</Link></h5>
            <p>{address}</p>
            <p>{city},{state} {zip}</p>
            <h6>{size} sqft</h6>
            <h6>{description}</h6>
            <h6><Link to={spacePageLink} >Public Preview</Link></h6>
          </Card>
        </Col>
      // </div>
    )
  }
}

export default HostSpace
