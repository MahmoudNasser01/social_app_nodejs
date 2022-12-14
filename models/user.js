const mongoose = require('mongoose');
const  UserModel = new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
            min:3,
            max:100,
            unique:true
        },
        email:{
            type:String,
            require:true,
            max:100,
            unique:true
        },
        password:{
            type:String,
            require:true,
            max:100,
            min:6,
        },
        profileImg:{
            type:String,
            default:"",
        },
        coverImg:{
            type:String,
            default:"",
        },
        followers:{
            type:Array,
            default:[]
        },

        following:{
            type:Array,
            default:[]
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        desc: {
            type: String,
            max: 50,
        },
        city: {
            type: String,
            max: 50,
        },
        from: {
            type: String,
            max: 50,
        },
        relationship: {
            type: Number,
            enum: [1, 2, 3],
        },
    },
    {
        timestamps:true
    }

);


module.exports = mongoose.model("UserModel", UserModel);