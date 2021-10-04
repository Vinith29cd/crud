const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app =express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/',function(req,res){
    res.send(req.query.name);
})

app.post('/home',function(req,res){
    var name=req.body.name;
})