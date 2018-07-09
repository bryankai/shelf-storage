import React, { Component }  from 'react';
import {Modal, Button, Input, Row, Table} from 'react-materialize'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createOrder } from '../actions/guests';

class BookSpaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      newUser: false
    };
  }

  settingFormToState = ({ name, value }) => {
    this.setState({ [name]: value });
  };

  handleNewUser = () => {
    this.setState({ newUser: true });
  };

  loginSubmit = () => {
    request("/auth/token", "post", {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        return request("/auth/token");
      })
      .then(response => {
        AuthenticationService.setAuthState(response.data);
        this.props.handleClose();
      });
  };

  createNewUser = () => {
    request("/users", "post", {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      request("/auth/token", "post", {
        email: response.data.data.email,
        password: this.state.password
      })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          return request("/auth/token");
        })
        .then(response => {
          AuthenticationService.setAuthState(response.data);
          this.props.handleClose();
        });
    });
  };

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
        trigger={<Button>MODAL</Button>}>
        <div className='modal-body'>

        </div>
        <div className='modal-instructions'>
          <div>Select Dates</div>
        </div>
        <Row className='date-selection'>
          <form className='book-form' id='book-form' onSubmit={event => this.handleSubmit(event, id)}>
            <Input name='on' type='date' label="Start Date"   id="startDate"
              // need to implement price calc
              onChange={event => this.setState({startDate: event.target.value})}
            />
            {/* <div> -> </div> */}
            <Input name='on' type='date' label="End Date" id="endDate"
              onChange={event => this.setState({endDate: event.target.value})}
            />
          </form>
        </Row>
        <Row id='book-results'>
          { this.state.alert ?
          <p className='alert'>ERROR.  Start Date must be before End Date.</p>
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
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createOrder}, dispatch)
}

export default connect(null, mapDispatchToProps)(BookSpaceModal)
