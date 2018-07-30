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
      loginType: "guest" //guest || host
    };
  }

  handleLogin = async (event) => {
    event.preventDefault()
    if (this.state.loginType === 'guest') {
      await this.props.userLogin(this.state.email, this.state.password)
    } else if (this.state.loginType === 'host') {
      await this.props.hostLogin(this.state.email, this.state.password)
    }
  }

  handleOptionChange = async (type) => {
    await this.setState({loginType: type})
  }

  render() {
    const modalStyle = {
      justifyContent: 'center',
      height: '380px',
      width: '650px'
    }

    return (
      <Modal style={modalStyle}
        header='Login'
        id='loginModal'
        fixedFooter
        actions={
          <div className='modal-footer-buttons'>
            <Button className='login-button' waves='light'
              value="Login"
              onClick={(event)=>this.handleLogin(event)}
              >Login</Button>
            <Button flat modal="close" waves="light">Close</Button>
          </div>
        }
        trigger={<div>Login</div>}>
            <Row className="login-type-row center-center">
              <Col className="login-type">
                <div className={
                  this.state.loginType === 'guest'
                  ? "login-type-button btn waves-effect waves-light"
                  : "login-type-button btn waves-effect waves-light btn-flat"
                }
                value="guest"
                  onClick={event => this.handleOptionChange("guest")}>
                  Guest
                </div>
              </Col>
              <Col className="login-type">
                <div className={
                  this.state.loginType === 'host'
                  ? "login-type-button btn waves-effect waves-light"
                  : "login-type-button btn waves-effect waves-light btn-flat"
                }
                value="host"
                    onClick={event =>this.handleOptionChange("host")}>
                    Host
                  </div>
                </Col>
            </Row>
            <form className='login-form'
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
