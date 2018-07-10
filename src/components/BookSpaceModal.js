import React, { Component }  from 'react';
import {Modal, Button, Input, Row, Table} from 'react-materialize'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createOrder } from '../actions/guests';


import 'react-dates/initialize';
import { DateRangePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


class LoginModal extends Component {
  state = {
    startDate: null,
    endDate: null,
    duration: null,
    totalCost: null,
    focusedInput: null,
  };

  handleSubmit = (event, spaceId) => {
    event.preventDefault()
    const guestId = 1 //Later, grab from authState
    console.log(guestId, spaceId, this.state.startDate,this.state.endDate, this.state.totalCost)
    this.props.createOrder(guestId, spaceId, this.state.startDate,this.state.endDate, this.state.totalCost)
  }


  // Need to add this in...
  handlePriceCalc = (price) => {
    console.log('handlePrice', this.state.endDate - this.state.startDate)
    if(this.state.startDate && this.state.endDate) {
      console.log('both exist')
      // NEED TO FIX FOR DIFFERENT MONTHS!
      console.log(typeof this.state.endDate)
      // const startDateVal = this.state.startDate.slice(0,2)
      // const endDateVal = this.state.endDate.slice(0,2)
      const duration = (this.state.endDate-this.state.startDate)/86400000 // dividing by # of microseconds in a day
      const totalCost = duration*price
      const alert = duration<1
      this.setState({duration, totalCost, alert})
      console.log(this.state);
    }
  }

  componentDidUpdate =  (prevProps, prevState) => {
    console.log(prevState, this.state, this.props.space.price)
    console.log(prevState.startDate!==this.state.startDate)
    if(prevState.startDate!==this.state.startDate || prevState.endDate!==this.state.endDate) {
      console.log('start or end date changed')
      this.handlePriceCalc(this.props.space.price)
    }
    console.log('componentDidUpdate')
  }

  render() {
    const {id, name, price}  = this.props.space
    const modalStyle = {
      minHeight: '550px',
      maxWidth: '500px',
      fontSize: '1em',
      justifyContent: 'center'
    }

    return (
      <Modal style={modalStyle}
        header={name}
        fixedFooter
        actions={
          <div className='modal-footer-buttons'>
            <Button className={this.state.duration<1 ? 'book-space-button disabled' : 'book-space-button'} waves='light' type="submit" form="book-form" value="Book" modal="close">Book</Button>
            <Button flat modal="close" waves="light">Close</Button>
          </div>
        }
        trigger={<Button>Book Now!</Button>}>
        <div className='modal-instructions'>
          <div>Select Dates</div>
        </div>
        <Row className='date-selection'>
          <form className='book-form' id='book-form' onSubmit={event => this.handleSubmit(event, id)}>
            <Input name='on' type='date' label="Start Date"   id="startDate"
              // need to implement price calc - maybe use momentJS?
              onChange={event => this.setState({startDate: event.target.value})}
            />
            <Input name='on' type='date' label="End Date" id="endDate"
              onChange={event => this.setState({endDate: event.target.value})}
            />
          </form>
        </Row>
        <Row id='book-results'>
          { this.state.alert ?
          <p className='alert'>ERROR: Start Date must be before End Date.</p>
            : <div>
              {this.state.totalCost?
                <div>
                  {/* <p>Duration: {this.state.duration} days </p>
                  <p>Price/day: ${price} </p>
                  <p><b>
                    Total Cost: ${this.state.totalCost}
                  </b></p> */}
                  <Table>
                    <tbody>
                      <tr>
                        <td>${price} x {this.state.duration} days</td>
                        <td>${this.state.totalCost}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                :null}
            </div>
          }
        </Row>
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
          />
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createOrder}, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginModal)
