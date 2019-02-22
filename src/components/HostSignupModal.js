import React, { Component }  from 'react';
import {Modal, Button, Input} from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hostSignup, hostLogin } from '../actions/hostAuth';

class HostSignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      avatar: null,
      signupType: 'host' //guest || host
    };
  }

  handleGuestSignup = async (event) => {
    event.preventDefault()
    const isAuthenticated = await this.props.hostSignup(this.state)
    if (isAuthenticated) {
      window.$('#guestSignupModal').modal('close');
      window.$('#materialize-modal-overlay-1').css('opacity', '0')
    }
    this.props.hostLogin(this.state.email, this.state.password)
  };

  render() {
    const modalStyle = {
      justifyContent: 'center',
      height: '550px',
      width: '550px'
    }

    return (
      <Modal style={modalStyle}
        header='Host Sign Up'
        id='hostSignupModal'
        fixedFooter
        actions={
          <div className='modal-footer-buttons'>
            <Button className='signup-button' waves='light' type="submit" form="host-signup-form" value="Login"
              // modal="close"
              >Sign up</Button>
            <Button flat modal="close" waves="light">Close</Button>
          </div>
        }
        trigger={
            <Button waves='light' className='signup-button' value="Signup" s={6}>Host Sign Up</Button>
        }>
          <form className='host-signup-form'
            id='host-signup-form'
            onSubmit={event =>
              this.handleGuestSignup(event)}
            >
            <Input label="First Name" s={6} required
              onChange={event =>
                this.setState({first_name: event.target.value})}
            />
            <Input label="Last Name" s={6} required
              onChange={event =>
                this.setState({last_name: event.target.value})}
            />
            <Input type="email" label="Email" s={12} required
              onChange={event =>
                this.setState({email: event.target.value})}
            />
            <Input type="password" label="Password" s={12} required
              onChange={event =>
                this.setState({password: event.target.value})}
            />
            <Input label="Avatar URL" s={12} required
              onChange={event =>
                this.setState({avatar: event.target.value})}
            />
          </form>
        <div className={ this.props.hostAuth.showSignupError ? 'signup-auth-error' : 'signup-hide-auth-error' }>
          Invalid signup submission.
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = ({hostAuth}) => ({hostAuth});

const mapDispatchToProps = dispatch => (bindActionCreators({hostSignup, hostLogin}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(HostSignupModal);
