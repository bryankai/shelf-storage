import React, { Component }  from 'react';
import {Modal, Button, Input, Row} from 'react-materialize'

class BookSpaceModal extends Component {

  render() {
    const {name,
      // price
    }  = this.props.space
    const modalStyle = {
      minHeight: '600px'
    }

    return (
      <Modal style={modalStyle}
        header={name}
        trigger={<Button>MODAL</Button>}>
        <Row>
          <Input name='on' type='date' onChange={function(e, value) {}} label="Start Date"/>
          <Input name='on' type='date' onChange={function(e, value) {}} label="End Date"/>
          {/* <Input type="password" label="password" s={12} />
          <Input type="email" label="Email" s={12} /> */}
        </Row>
      </Modal>
    )
  }
}

export default BookSpaceModal
