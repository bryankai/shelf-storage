import React, { Component }  from 'react';
import {Modal, Button, Input} from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class NewSpaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      avatar: null,
      signupType: 'guest' //guest || host
    };
  }

  handleCreateNewSpace = async (event) => {
    event.preventDefault()
    const isAuthenticated = await this.props.userSignup(this.state)
    if (isAuthenticated) {
      window.$('#guestSignupModal').modal('close');
      window.$('#materialize-modal-overlay-1').css('opacity', '0')
    }
    this.props.userLogin(this.state.email, this.state.password)
  };

  render() {
    const modalStyle = {
      justifyContent: 'center',
      height: '550px',
      width: '550px'
    }

    return (
      <Modal style={modalStyle}
        header='List your space'
        id='newSpaceModal'
        fixedFooter
        actions={
          <div className='modal-footer-buttons'>
            <Button className='signup-button' waves='light' type="submit" form="new-space-modal" value="Login"
              // modal="close"
              >Create New Space</Button>
            <Button flat modal="close" waves="light">Close</Button>
          </div>
        }
        trigger={
            <Button waves='light' className='signup-button' value="Signup" s={6}>Create New Space</Button>
        }>
          <form className='new-space-modal'
            id='new-space-modal'
            onSubmit={event =>
              this.handleCreateNewSpace(event)}
            >
            <Input label="Name Your Space" s={6} required
              onChange={event =>
                this.setState({Name: event.target.value})}
            />
            <Input label="Description of Space" s={6} required
              onChange={event =>
                this.setState({description: event.target.value})}
            />
            <Input type="Image Link" s={12} required
              onChange={event =>
                this.setState({img_link: event.target.value})}
            />
            <Input type="Address" s={12} required
              onChange={event =>
                this.setState({address: event.target.value})}
            />
            <Input label="City" s={12} required
              onChange={event =>
                this.setState({city: event.target.value})}
            />
            <Input label="State" s={12} required
              onChange={event =>
                this.setState({state: event.target.value})}
            />
            <Input label="Zip Code" s={12} required
              onChange={event =>
                this.setState({zip: event.target.value})}
            />
          </form>
        <div className={ this.props.auth.showSignupError ? 'signup-auth-error' : 'signup-hide-auth-error' }>
          Invalid submission.
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(NewSpaceModal);
