import React, { Component } from 'react'
import '../style.css';
import axios from 'axios';
import values from '../values';
import {Redirect} from 'react-router-dom';
export default class LoginSignup extends Component {
  state={
      isSignup:false,
      fullname:"",
      email:"",
      password:"",
      loginSuccess:false
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
    let {email,password} = this.state;
    if(this.state.isSignup){
      if(this.state.fullname && this.state.email && this.state.password){
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
      axios.post(`${values.BASE}/login`,{email,password})
        .then(success=>{
          //debugger;
          localStorage.setItem('access_token',success.data.token);
          this.setState({loginSuccess:true});
        })
        .catch(e=>{
          alert(`Login Unsuccessful`);
        });
      if(this.state.email && this.state.password){
        
      }
      else{
        alert('Parameter missing for Login');
      }
    }
  }
  componentWillMount(){
    if(localStorage.getItem('access_token')){
      this.setState({loginSuccess:true});
    }
  }
  render() {
    //Redirect for login
    if(this.state.loginSuccess){
      return (<Redirect to="/"/>);
    }
    //General Login page
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