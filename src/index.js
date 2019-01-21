const express = require('express');
const bp      = require('body-parser');
const signup  = require('./controllers/signup');
const login   = require('./controllers/login');
const app     = express();

// Middlewares
app.use(bp.json());

//Routes
app.use(signup);
app.use(login);
const _port = process.env.PORT || 4000;
app.listen(_port,()=>{
    console.log(`Application listening on port: ${_port}`)
});