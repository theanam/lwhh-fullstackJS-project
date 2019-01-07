const express = require('express');
const bp      = require('body-parser');

const app     = express();




const _port = process.env.PORT || 4000;
app.listen(_port,()=>{
    console.log(`Application listening on port: ${_port}`)
});