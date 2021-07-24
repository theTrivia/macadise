const appNamesToZsh = require('../processes/appNamesToZsh');

exports.getAppNameFromUser = async(req,res)=>{
    const userResponse = req.body.appNames;
    // console.log(userResponse);
    // const appNames = []
    const appNames = [...userResponse]
    // console.log(appNames);
    appNamesToZsh.appNamesToZsh(appNames);
    // res.send('App Names were recieved 😎');
    // res.download(../tmp/random.txt);
    const file = '/Users/soham/Documents/github/macadise/tmp/random.txt';
    res.download(file)
}