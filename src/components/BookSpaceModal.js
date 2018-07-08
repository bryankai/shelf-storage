import React, { Component }  from 'react';
import {Modal, Button, Input, Row} from 'react-materialize'

class BookSpaceModal extends Component {
  state = {
    startDate: '',
    endDate: '',
    totalPrice: ''
  };

  handleSubmit = event => {
    event.preventDefault()
    // this.props.userLogin(this.state, this.props.history);
    this.setState(this.state);
    console.log(this.state)
  }


  // Need to add this in...
  handlePriceCalc = (price) => {
    if(this.state.startDate && this.state.endDate) {
      const duration = this.state.endDate - this.state.startDate
      const totalPrice = duration*price
      this.setState({totalPrice})
    }
  }

  render() {
    const {name,
      price
    }  = this.props.space
    const modalStyle = {
      minHeight: '600px'
    }

    return (
      <Modal style={modalStyle}
        header={name}
        trigger={<Button>MODAL</Button>}>
        <Row>
          <form className='book-form' id='book-form' onSubmit={event => this.handleSubmit(event)}>
            <Input name='on' type='date' label="Start Date"   id="startDate"
              // need to implement price calc
              onChange={event => this.setState({startDate: event.target.value})}
            />
            <Input name='on' type='date' label="End Date" id="endDate"
              onChange={event => this.setState({endDate: event.target.value})}
            />
            <Input placeholder="Placeholder" label="First Name" />
            <Button waves='light' className='book-space-button' type="submit" form="book-form" value="Book">Book</Button>
          </form>
        </Row>
        <Row>
          <p>{this.state.totalPrice?this.state.totalPrice:null}</p>
        </Row>
      </Modal>
    )
  }
}

export default BookSpaceModal
