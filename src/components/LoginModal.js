
import React, { Component }  from 'react';
import {Modal, Button, Input, Row} from 'react-materialize'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createOrder } from '../actions/guests';
import { userLogin } from '../actions/auth';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // firstName: "",
      // lastName: "",
      email: "",
      password: "",
      loginType: 'guest' //guest || host
      // newUser: false
    };
  }
  //
  // settingFormToState = ({ name, value }) => {
  //   this.setState({ [name]: value });
  // };
  //
  // handleNewUser = () => {
  //   this.setState({ newUser: true });
  // };
  //
  handleLogin = (event) => {
    event.preventDefault()
    console.log('!!!!!', event)
    console.log(this.state.email, this.state.password)
    this.props.userLogin(this.state.email, this.state.password)
  };
  //
  // createNewUser = () => {
  //   request("/users", "post", {
  //     firstName: this.state.firstName,
  //     lastName: this.state.lastName,
  //     email: this.state.email,
  //     password: this.state.password
  //   }).then(response => {
  //     request("/auth/token", "post", {
  //       email: response.data.data.email,
  //       password: this.state.password
  //     })
  //       .then(response => {
  //         localStorage.setItem("token", response.data.token);
  //         return request("/auth/token");
  //       })
  //       .then(response => {
  //         AuthenticationService.setAuthState(response.data);
  //         this.props.handleClose();
  //       });
  //   });
  // };

  render() {
    const modalStyle = {
      // minHeight: '550px',
      // maxWidth: '500px',
      justifyContent: 'center',
      height: '340px',
    }

    return (
      <Modal style={modalStyle}
        header='Login'
        fixedFooter
        actions={
          <div className='modal-footer-buttons'>
            <Button className='login-button' waves='light' type="submit" form="login-form" value="Login"
              // modal="close"
              >Login</Button>
            <Button flat modal="close" waves="light">Close</Button>
          </div>
        }
        trigger={
            <div>Login</div>
        }>
          <form className='login-form' id='login-form'
            onSubmit={event =>
              // console.log('login')}
              this.handleLogin(event)}
            >
            <Input type="email" label="Email" s={12}
              onChange={event =>
                // console.log(event.target.value)}
                this.setState({email: event.target.value})}
            />
            <Input type="password" label="password" s={12}
              onChange={event =>
                // console.log(event.target.value)}
                this.setState({password: event.target.value})}
            />
          </form>
        <Row id='alerts'>
          {/* { this.state.alert ?
          <p className='alert'>ERROR: Email and/or password do not match database.</p>
            : null
          } */}
        </Row>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({showLoginError: state.auth.showLoginError});

const mapDispatchToProps = dispatch => (bindActionCreators({userLogin}, dispatch));

export default connect(
  mapStateToProps,
  // null,
  mapDispatchToProps)(LoginModal);
