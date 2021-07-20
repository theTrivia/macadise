const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const app = express();

const applist = []

async function getformulaeapplist(){
    const apps = await fetch('https://formulae.brew.sh/api/analytics/cask-install/30d.json');
    let response = await apps.json();
    console.log(response[category]);
    // console.log(response);
    // applist = response[items];
    let key = 'items';
    for (key in response){
        if(response.hasOwnProperty(key)){
            let value = response[key];
            console.log(value[0]);
        }
    }
}

app.get('/',(req,res)=>{
    // GET https://formulae.brew.sh/api/analytics/${CATEGORY}/${DAYS}.json
    getformulaeapplist()
});

app.get('/pushApptoDB',(req,res)=>{
    getformulaeapplist();
    // console.log("lenght of applist " + applist.length);
})

mongoose.connect("mongodb+srv://theTrivia:Icantunderstand2@cluster0.acfkv.mongodb.net/macadise?retryWrites=true&w=majority")
.then(result=>{
    app.listen(3000);
    console.log('db connected');
})
.catch(err=>{
    console.log(err);
})
