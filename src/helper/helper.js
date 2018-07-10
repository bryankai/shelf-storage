import React, { Component } from 'react'
import axios from 'axios'

////////////////////////////////////////////////////////////////////
/// AuthenticationWrapper //////////////////////////////////////////

class AuthenticationWrapper extends Component{
  constructor(props){
    super(props)

    this.state = {
      authState: null,
      authStatePending: true
    }
  }

  handleAuthState = (authState) => {
    this.setState({ authState, authStatePending: false})
  }

  componentWillMount(){
    const authState = AuthenticationService.getAuthState()
    const authStatePending = authState ? false : true

    this.setState({ authState, authStatePending })

    AuthenticationService.registerEvent(this.handleAuthState)
  }

  componentWillUnmount(){
    AuthenticationService.deRegisterEvent(this.handleAuthState)
  }

  render(){
    const { Component, ...props} = this.props
    return (
      <Component {...props}
        authState={this.state.authState}
        authStatePending={this.state.authStatePending}
      />
    )
  }

}

export const withAuthentication = (Component) =>
  (props) =>
    <AuthenticationWrapper Component={Component} {...props}/>

////////////////////////////////////////////////////////////////////
/// AuthenticationService //////////////////////////////////////////

class AuthService{
  constructor(){
    if(!AuthService.instance){
      this.authState = null
      this.registeredCallbacks = []

      AuthService.instance = this
      return AuthService.instance
    }
    else {
      return AuthService.instance
    }
  }
  setAuthState(val){
    this.authState = val
    this.registeredCallbacks.forEach(cb => cb(this.authState))
  }
  getAuthState(){
    return this.authState
  }
  registerEvent(cb){
    this.registeredCallbacks.push(cb)
  }
  deRegisterEvent(cb){
    this.registeredCallbacks = this.registeredCallbacks.filter(ele => ele !== cb)
  }
}
export const AuthenticationService = new AuthService()

////////////////////////////////////////////////////////////////////
/// request ////////////////////////////////////////////////////////

export const request = (path, method = 'get', body = null) => {

  const token = localStorage.getItem('token')

  return axios(`${process.env.REACT_APP_BACKEND}${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    },
    data: body
  })
  .catch(error => {
    if(error.response.status === 401){
      AuthenticationService.setAuthState(null)
    }
    return Promise.reject(error)
  })
}

////////////////////////////////////////////////////////////////////
/// getDistance ////////////////////////////////////////////////////////

export const getDistance = (a,b) => {
  const R = 3959 // miles
  const φ1 = a.lat * (Math.PI / 180)
  const φ2 = b.lat * (Math.PI / 180)
  const Δφ = φ2 - φ1
  const Δλ = (b.lng-a.lng)* (Math.PI / 180)
  const α = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2)
  const c = 2 * Math.atan2(Math.sqrt(α), Math.sqrt(1-α))
  console.log(c)
  const d = R * c
  return d
}
