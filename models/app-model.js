const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appSchema = new Schema({
    appCode:{
        type : String,
        required : true,
    },
    percent:{
        type : Number,
        // required : true,
    },
    countSince30Days:{
        type : Number,
    },

});
module.exports = mongoose.model('App',appSchema);
