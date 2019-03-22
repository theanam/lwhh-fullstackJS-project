import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
export default class Urls extends Component {
  state={
    loggedIn:true
  }
  componentWillMount(){
    if(!localStorage.getItem('access_token')){
      this.setState({loggedIn:false});
    }
  }
  render() {
    if(!this.state.loggedIn){
      return (<Redirect to="/"/>);
    }
    return (
      <div>
        private component
      </div>
    )
  }
}
