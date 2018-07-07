import React, { Component }  from 'react';
import {Card, CardTitle, Col} from 'react-materialize'

class Space extends Component {

  render() {
    const {id, name, description, img_link,
      // hosts_id, address, city, state, zip, temp_control, access, size, price, active, deleted_at
    } = this.props.space

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

    const spacePageLink = `/spaces/${id}`

    return (
      <Col s={6} m={12} l={4} xl={3}>
        <Card className='medium'
          id='space-card'
          style={imgCropStyle}
          header={<CardTitle image={img_link} >{truncateString(name,21)}</CardTitle>}
          actions={[<a key={id} href={spacePageLink}>See Details</a>]}>
          {truncateString(description, 50)}
        </Card>
      </Col>
    )
  }
}

export default Space
