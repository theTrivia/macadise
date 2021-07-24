const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const App = require('../models/app-model');


/* this method fetches the cask names from homebrew website. */
async function getformulaeapplist(){
    const apps = await fetch('https://formulae.brew.sh/api/analytics/cask-install/30d.json');
    let response = await apps.json();
    console.log(response);

    let key = 'items';
    let values;
    for (key in response){
        if(response.hasOwnProperty(key)){
            values = response[key];
        }
    }
    console.log('getformulaeapplist() has been triggered ' + new Date().toLocaleString());
    return values;
}




/*
    gets the data from getformulaeapplist()
    searches the db if a certain cask name is present in db or not.
        if the cask is not present in db -> adds the cask into the db.
        else prints cask already present in DB.
*/
exports.modifiedPushToDb = async() => {
    const result = await getformulaeapplist();
    const lenOfResult = result.length;
    for(i = 0; i<lenOfResult; i++){
        const caskName = result[i]['cask'];
        const caskFoundOrNot = await App.findOne({appCode:caskName});
        if(!caskFoundOrNot){
            const newCaskEntry = new App({
                appCode : caskName
            });
            const caskNameSaveResult = await newCaskEntry.save();
            console.log('cask' +  caskName + 'saved in db😉');
        }
        else{
            console.log("*************** cask already present in DB. ***************")
        }
    }
}

