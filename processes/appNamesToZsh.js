const fs = require('fs');

function unnamedFunction(appNames){
    for(i=0;i<appNames.length;i++){
        scriptString = scriptString + '\n';
        scriptString = scriptString + 'brew install '+appNames[i];
    }
    console.log(scriptString);
    fs.writeFile('tmp/random.txt',scriptString,(err)=>{
        console.log(err);
    });
}

exports.appNamesToZsh = async(appNames)=>{
    // const appNameList = [...appNames];
    // console.log("name of apps from appNamesToZsh() "+appNameList);
    // console.log(appNames);
    await unnamedFunction(appNames);
    
}

scriptString = '#!/bin/zsh';





// /Users/soham/Documents/github/macadise/tmp



