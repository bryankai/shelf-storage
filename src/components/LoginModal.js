import React, { Component }  from 'react';
import {Modal, Button, Input, Row, Col} from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogin, getUser } from '../actions/auth';
import { hostLogin } from '../actions/hostAuth';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginType: null //guest || host
    };
  }

  handleLogin = async (event) => {
    event.preventDefault()
    console.log(this.state.loginType)
    let isAuthenticated = null
    if (this.state.loginType === 'guest') {
      isAuthenticated = await this.props.userLogin(this.state.email, this.state.password)
    } else if (this.state.loginType === 'host') {
      isAuthenticated = await this.props.hostLogin(this.state.email, this.state.password)
    }
    if (isAuthenticated) {
      window.$('#loginModal').modal('close');
      window.$('#materialize-modal-overlay-1').css('opacity', '0')
      // this.props.getUser(this.props.auth.user.id)
    }
  }

  handleOptionChange = async (event) => {
    // event.preventDefault()
    await this.setState({loginType: event.target.value})
    console.log(this.state.loginType);
  }



  render() {
    const modalStyle = {
      justifyContent: 'center',
      height: '380px',
      // 550 for production, 600 for testing 2 types of login selections
      // width: '550px'
      width: '650px'
    }

    return (
      <Modal style={modalStyle}
        header='Login'
        id='loginModal'
        fixedFooter
        actions={
          <div className='modal-footer-buttons'>
            <Button className='login-button' waves='light' type="submit" form="login-form" value="Login"
              >Login</Button>
            <Button flat modal="close" waves="light">Close</Button>
          </div>
        }
        trigger={<div>Login</div>}>
          <form className='login-form'
            id='login-form'
            onSubmit={event => this.handleLogin(event)}
          >
            <Row className="login-type-row">
              <Col className="radio login-type">
                <label>
                  <input type="radio" value="guest"
                    checked={this.state.loginType === 'guest'}
                    onChange={event => this.handleOptionChange(event)} />
                    Guest
                </label>
              </Col>
              <Col className="radio login-type">
                <label>
                  <input type="radio" value="host"
                    checked={this.state.loginType === 'host'}
                    onChange={event =>this.handleOptionChange(event)} />
                    Host
                  </label>
                </Col>
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
        <div className={ this.props.auth.showLoginError || this.props.hostAuth.showLoginError ? 'login-auth-error' : 'login-hide-auth-error' }>
          Invalid Username or Password
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = ({auth, hostAuth}) => ({auth, hostAuth});

const mapDispatchToProps = dispatch => (bindActionCreators({userLogin, hostLogin, getUser}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
