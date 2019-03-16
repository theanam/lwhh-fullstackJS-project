import React, { Component } from 'react'
import '../style.css';
import axios from 'axios';
import values from '../values';
export default class LoginSignup extends Component {
  state={
      isSignup:false,
      fullname:"",
      email:"",
      password:""
  }
  showSignupForm = ()=>{
    this.setState({isSignup:true})
  }
  showLogin = ()=>{
    this.setState({isSignup:false})
  }
  updateStateValue=(e)=>{
    let tgt = e.target;
    let stateName = tgt.name;
    let val = tgt.value;
    //debugger;
    this.setState({
      [stateName]:val
    });
  }
  loginSignup = ()=>{
    if(this.state.isSignup){
      if(this.state.fullname && this.state.email && this.state.password){
        let {email,password} = this.state;
        let name = this.state.fullname;
        axios.post(`${values.BASE}/signup`,{name,email,password})
          .then(d=>{
            alert("Congratulations! Sign up completed");
            this.setState({
              isSignup:false
            });
          })
          .catch(e=>{
            console.log("Sign up Error! please try again");
          })
          .then(d=>{
            this.setState({
              fullname:"",
              email:"",
              password:""
            });
          })
      }
      else{
        alert('Parameter missing for signup');
      }
    }
    else{
      // Login Code
      if(this.state.email && this.state.password){
        
      }
      else{
        alert('Parameter missing for Login');
      }
    }
  }
  render() {
    return (
      <div className="container" style={styles.container}>
        <h2>{this.state.isSignup?'Sign Up':'Log In'}</h2>
        <div className="loginsignup">
            <input onChange={this.updateStateValue} 
            style={{...styles.input,display:this.state.isSignup?'block':'none'}} 
            type="text" name="fullname" 
            placeholder="full name"/>
            <input onChange={this.updateStateValue} 
            style={styles.input} 
            type="email" name="email" 
            placeholder="Email Address"/>
            <input onChange={this.updateStateValue} 
            style={styles.input} 
            type="password" name="password" 
            placeholder="Enter password"/>
        </div>
        <div className="button" onClick={this.loginSignup}>{this.state.isSignup?'Sign Up':'Login'}</div>
        <div className="button" style={{display:this.state.isSignup?'none':'block'}} onClick={this.showSignupForm}>Sign Up Now →</div>
        <div className="button" style={{display:this.state.isSignup?'block':'none'}} onClick={this.showLogin}>← Go Back To Login</div>
      </div>
    )
  }
}

const styles = {
    input:{
        fontSize:18,
        color:'blue',
        display:'block'
    }
}