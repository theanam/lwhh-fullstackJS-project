import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import values from '../values';
import axios from 'axios';
export default class Urls extends Component {
  state={
    loggedIn:true,
    loading:true,
    token:""
  }
  componentWillMount(){
    let token = localStorage.getItem('access_token');
    if(!token){
      this.setState({loggedIn:false});
    }
    else{
      this.setState({token});
    }
  }
  addNewURL = ()=>{

  }
  handleKeyUp=(evt)=>{
    if(evt.keyCode===13){ //enter key
      if(evt.target.value && evt.target.value.match(/^https?:\/\/.{3,}/)){
        this.setState({loading:true});
        axios.post(`${values.BASE}/api/v1/redirects`,{url:evt.target.value},{headers:{'auth-token':this.state.token}})
          .then(s=>{
            console.log(s);
            alert(`Direction Created! ${values.BASE}/${s.data.hash}`);
          })
          .catch(e=>console.log(e))
          .finally(()=>{
            this.setState({loading:false});
          });
      }
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
            <input onKeyUp={this.handleKeyUp} placeholder="Enter long URL. e.g: https://my-long.url/parameters?query" type="url"/>
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
