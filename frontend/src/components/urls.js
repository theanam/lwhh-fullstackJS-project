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
        {/* New Entry */}
        <div className="urlentry commonsize">
          <h3>
            Add New URL
          </h3>
          <div>
            <input placeholder="Enter long URL. e.g: https://my-long.url/parameters?query" type="url"/>
          </div>
        </div>
        {/* Success */}
        <div className="success commonsize">
          Your new Shortened URL is: <a target="_blank" href="http://app.url/key">http://app.url/key</a>
        </div>
        {/* List */}
        <div className="commonsize">
          <h3>Your URL List</h3>
        </div>
        <div className="url-list">
          {/* This part will repeat */}
          <div className="url">
            <h4 className="shortened-url"><a target="_blank" href="http://app.url/key">app.url/key</a></h4>
            <div className="smalltext">
            <a target="_blank" href="http://long.url/param/anotherparam">http://long.url/param/anotherparam</a>
            </div>
          </div>
          {/* This part will repeat */}
          {/* Empty State */}
          <div className="empty">
            🧐 hmm! Could not find anything yet!
          </div>
        </div>
      </div>
    )
  }
}
