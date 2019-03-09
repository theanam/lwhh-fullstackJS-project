import React, { Component } from 'react'

export default class LoginSignup extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div className="loginsignup">
            <input style={styles.input} type="text" name="fullname" placeholder="full name"/>
            <input style={styles.input} type="email" name="email" placeholder="Email Address"/>
            <input style={styles.input} type="password" name="password" placeholder="Enter password"/>
        </div>
      </div>
    )
  }
}

const styles = {
    container:{
        fontSize:24,
        color:'red'
    },
    input:{
        fontSize:18,
        color:'blue',
        display:'block',
        margin:20
    }
}