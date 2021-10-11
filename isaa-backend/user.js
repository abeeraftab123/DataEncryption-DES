//requiring mongoose
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//defining structure of user schema
const User=new Schema({
    T_name:{
        type:String,
    },
    T_email:{
        type:String,
    },
    password:{
        type:String
    },
    T_dob:{
        type:String
    },
    T_gender:{
        type:String
    },
    T_phone:{
        type:String
    }
});

const user=mongoose.model('User',User);

//exporting teacher schema
module.exports=user