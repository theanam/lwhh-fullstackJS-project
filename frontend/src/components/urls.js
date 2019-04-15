import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import values from '../values';
import axios from 'axios';
function Conditional(props){
  if(props.condition){
    return (<div className={props.className}>
      {props.children}
    </div>);
  }
  else{
    return null;
  }
}
function UrlComponent(props){
  return(<div className="url">
  <h4 className="shortened-url"><a target="_blank" href={`${values.BASE}/${props.data.hash}`}>{`${values.BASE}/${props.data.hash}`}</a></h4>
  <div className="smalltext">
  <a target="_blank" href={props.data.destination}>{props.data.destination}</a>
  </div>
  </div>);
}
export default class Urls extends Component {
  state={
    loggedIn:true,
    loading:true,
    token:"",
    newHash:"",
    urlList:[]
  }
  componentWillMount(){
    let token = localStorage.getItem('access_token');
    if(!token){
      this.setState({loggedIn:false});
    }
    else{
      this.setState({token},this.getMyList);
    }
  }
  scheduleClear = ()=>{
    this.setState({newHash:""});
  }
  getMyList = ()=>{
    axios.get(`${values.BASE}/api/v1/redirects`,{headers:{'auth-token':this.state.token}})
      .then(data=>{
        this.setState({urlList:data.data});
      })
      .catch(e=>{
        console.log(e);
      })
  }
  handleKeyUp=(evt)=>{
    if(evt.keyCode===13){ //enter key
      let urlVal = evt.target.value;
      evt.target.value = "";
      if(urlVal && urlVal.match(/^https?:\/\/.{3,}/)){
        this.setState({loading:true});
        axios.post(`${values.BASE}/api/v1/redirects`,{url:urlVal},{headers:{'auth-token':this.state.token}})
          .then(s=>{
            console.log(s);
            //alert(`Direction Created! ${values.BASE}/${s.data.hash}`);
            this.setState({newHash:s.data.hash});
            this.getMyList();
            setTimeout(this.scheduleClear,10000);
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
        <Conditional className="success commonsize" condition={this.state.newHash}>
          Your new Shortened URL is: <a target="_blank" href={`${values.BASE}/${this.state.newHash}`}>{`${values.BASE}/${this.state.newHash}`}</a>
        </Conditional>
        {/* List */}
        <div className="commonsize">
          <h3>Your URL List</h3>
        </div>
        <div className="url-list">
          {this.state.urlList.reverse().map((el,i)=><UrlComponent data={el} key={i}/>)}
          {/* Empty State */}
          <Conditional condition={!this.state.urlList.length} className="empty">
            🧐 hmm! Could not find anything yet!
          </Conditional>
        </div>
      </div>
    )
  }
}
