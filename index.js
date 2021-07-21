const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const app = express();

const App = require('./app-model');


//this method fetches the cask names from homebrew website.
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

app.get('/',(req,res)=>{
    res.json('this is root');
});



/*
    gets the data from getformulaeapplist()
    searches the db if a certain cask name is present in db or not.
        if the cask is not present in db -> adds the cask into the db.
        else prints cask already present in DB.
*/
const modifiedPushToDb = async() => {
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


// const pushToDb = async(caskName) => {
//     const caskFoundOrNot = await App.findOne({appCode:caskName});

//     if(!caskFoundOrNot){
//         console.log("=========cask not found=========");
//         const newCaskEntry = new App({
//             appCode : caskName
//         });
//         const caskNameSaveResult = await newCaskEntry.save();
//         console.log('cask name saved in db😉');
//     }
// }



/*
    Fetches all the cask name from the database and send them to frontend in json format.
*/
app.get('/getAllApps',async(req,res)=>{
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
});


setInterval(modifiedPushToDb, 50000);

mongoose.connect("mongodb+srv://theTrivia:Icantunderstand2@cluster0.acfkv.mongodb.net/macadise?retryWrites=true&w=majority")
.then(result=>{
    app.listen(3000);
    console.log('db connected');
})
.catch(err=>{
    console.log(err);
})
