const {Schema, model} = require('mongoose');

const userSchema = new Schema({
fname:{
    type:String,
    required: true
}
,
lname:{
    type:String,
    required: true
}
,
email:{
    type:String,
    required:true
}
,
psw:{
    type:String,
    required: true
}
,
joining:{
    type:Date,
    default:Date.now 
}
})

const user = model("user", userSchema);
 module.exports =user