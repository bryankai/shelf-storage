import React, { Component }  from 'react';
import { Button, Input, Row, Table} from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createOrder } from '../actions/guests';
import { DateRangePicker } from 'react-dates';
import LoginModal from './LoginModal'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


class BookPage extends Component {
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
    this.props.createOrder(guestId, spaceId, this.state.startDate,this.state.endDate, this.state.totalCost)
  }

  handlePriceCalc = (price) => {
    if(this.state.startDate && this.state.endDate) {
      const duration = (this.state.endDate-this.state.startDate)/86400000 // dividing by # of microseconds in a day
      const totalCost = duration*price
      const alert = duration<1
      this.setState({duration, totalCost, alert})
    }
  }

  componentDidUpdate =  (prevProps, prevState) => {
    if(prevState.startDate!==this.state.startDate || prevState.endDate!==this.state.endDate) {
      this.handlePriceCalc(this.props.space.price)
    }
  }

  render() {
    const {id, name, price}  = this.props.space
    return (
      <div className='booking-container'>
        <h5>${price} / day </h5>
        <div className='booking-instructions'>
          <div>Select Dates</div>
        </div>
        <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
          anchorDirection="right"
        />
        <Row id='book-results'>
          { this.state.alert ?
            <p className='alert'>ERROR: Start Date must be before End Date.</p>
            : <div>
              {this.state.totalCost?
                <Table>
                  <tbody>
                    <tr>
                      <td className='table-col-1'>${price} x {this.state.duration} days</td>
                      <td className='table-col-2'><b>${this.state.totalCost}</b></td>
                    </tr>
                  </tbody>
                </Table>
              :null}
            </div>
          }
        </Row>
        {/* {this.props.auth.authorized ?
          <Button className={this.state.duration<1 ? 'book-space-button disabled' : 'book-space-button'} waves='light' value="Book" onClick={event => this.handleSubmit(event, id)}>Book</Button>
          : <LoginModal/>
        } */}

      </div>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createOrder}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPage)
