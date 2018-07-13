import React, { Component }  from 'react';
import {Modal, Button, Input, Row, Col} from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogin } from '../actions/auth';
import { getUser } from '../actions/auth';

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
    let isAuthenticated = null
    if (this.state.loginType=='guest') {
      isAuthenticated = await this.props.userLogin(this.state.email, this.state.password)
    } else if (this.state.loginType=='host') {
      isAuthenticated = await this.props.hostLogin(this.state.email, this.state.password)
    }
    if (isAuthenticated) {
      window.$('#loginModal').modal('close');
      window.$('#materialize-modal-overlay-1').css('opacity', '0')
      // this.props.getUser(this.props.auth.user.id)
    }
  };



  render() {
    const modalStyle = {
      justifyContent: 'center',
      height: '380px',
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
            <Row>
              <Col><Input name='userType' type='radio' value='guest' label='Guest' defaultValue='checked' s={3}
                onChange={event =>
                  this.setState({userType: event.target.value})} /></Col>
              <Col><Input name='userType' type='radio' value='host' label='Host' s={3}
                onChange={event =>
                  this.setState({userType: event.target.value})} /></Col>
            </Row>
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

const mapDispatchToProps = dispatch => (bindActionCreators({userLogin, getUser}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
