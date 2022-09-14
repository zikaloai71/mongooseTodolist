const validator = require('validator')
const mongoose = require('mongoose')
const User = mongoose.model("User",{
 title:{
        type:String,
        trim:true,
        required:true,
        minLength:3,
        maxLength:20
    },

date:{
     type:String,
     trim:true,
     required:true,
     validate(value){
        if(validator.isDate([value,new Date()]))
        {
          throw new Error ('enter valid date')
        }
     }
  },

activeStatus:{
        type:String,
        trim:true,
        toLowerCase:true,
        enum:['','on'],
        default:""
    },

}
)
module.exports= User;