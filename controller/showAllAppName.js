const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const App = require('../models/app-model');

/*
    Fetches all the cask name from the database and send them to frontend in json format.
*/
exports.getAllApps = async(req,res)=>{
    // const result = await getformulaeapplist();
    // res.json({result : result});
    const caskApps = await App.find();
    // res.send(caskApps);
    let caskList = [];
    for(i=0;i<caskApps.length;i++){
        caskList.push(caskApps[i]['appCode']);
    }
    // console.log(caskList);
    res.send(caskList);
    console.log('*****All the cask names were sent to the browser. No of cask Apps : '+ caskList.length+ '******')
};

