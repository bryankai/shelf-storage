import React, { Component }  from 'react';
import { Link } from 'react-router-dom'
import { Card, CardTitle, Col } from 'react-materialize'

import '../styles/HostSpace.css'

class HostSpace extends Component {

  render() {
    const {
      // Space
      id, name, description, img_link, address, city, state, zip, size,

    } = this.props.hostSpace

    const spaceOrdersLink = `/spaces/${id}/reservations`
    const spacePageLink = `/spaces/${id}`

    return (
        <Col s={12} m={12} l={12} key={id}>
          <Card id={id} key={id} className='orders-card horizontal'  header={<CardTitle image={img_link}></CardTitle>}
          >
            <h5><Link to={spaceOrdersLink} >{name}</Link></h5>
            <p>{address}</p>
            <p>{city},{state} {zip}</p>
            <h6>{size} sqft</h6>
            <h6>{description}</h6>
            <h6><Link to={spacePageLink} >Public Preview</Link></h6>
          </Card>
        </Col>
    )
  }
}

export default HostSpace
