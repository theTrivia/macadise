const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const app = express();

const routes = require('./routes/routes');
const pushAppToDatabaseProcess = require('./processes/pushAppNameToDatabase');



app.use(bodyParser.json());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/getAllApps',routes);

app.get('',(req,res,next)=>{
    res.json('404 not found');
});

setInterval(pushAppToDatabaseProcess.modifiedPushToDb,50000);


mongoose.connect("mongodb+srv://testuser:W45qwtpR2ByAijg@cluster-0.acfkv.mongodb.net/macadise?retryWrites=true&w=majority")
.then(result=>{
    app.listen(3000);
    console.log('db connected');
})
.catch(err=>{
    console.log(err);
});