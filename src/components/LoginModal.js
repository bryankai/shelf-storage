import React, { Component }  from 'react';
import {Modal, Button, Input} from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogin } from '../actions/auth';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginType: 'guest' //guest || host
    };
  }

  handleLogin = async (event) => {
    event.preventDefault()
    const isAuthenticated = await this.props.userLogin(this.state.email, this.state.password)
    console.log(isAuthenticated)
    if (isAuthenticated) {
      window.$('#loginModal').modal('close');
      window.$('#materialize-modal-overlay-1').css('opacity', '0')
    }
  };

  render() {
    const modalStyle = {
      justifyContent: 'center',
      height: '330px',
      width: '550px'
    }

    return (
      <Modal style={modalStyle}
        header='Login'
        id='loginModal'
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
          <form className='login-form'
            id='login-form'
            onSubmit={event =>
              this.handleLogin(event)}
            >
            <Input type="email" label="Email" s={12}
              onChange={event =>
                this.setState({email: event.target.value})}
            />
            <Input type="password" label="Password" s={12}
              onChange={event =>
                this.setState({password: event.target.value})}
            />
          </form>
        <div className={ this.props.auth.showLoginError ? 'login-auth-error' : 'login-hide-auth-error' }>
          Invalid Username or Password
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = dispatch => (bindActionCreators({userLogin}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
