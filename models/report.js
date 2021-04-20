var mongoose=require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

var Schema=mongoose.Schema;
var Report=new Schema({
    cmdtyName : {
        type :String, 
        required : true
    },
    cmdtyID : {
        type :String,
        required : true
    },
    marketID : {
        type : String,
        required : true
    },
    marketName : {
        type : String,
        required : true
    },
    users : [],
    priceUnit : {
        type : String,
        default : 'Kg'
    },
    price :{
        type : Number
    },
    timestamp : {
        type : Number,
        default : Math.floor(Date.now()/100)
    }
});

module.exports=new mongoose.model('Report',Report);