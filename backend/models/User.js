import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username:{
        type : String,
        required : true,
        unique : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    passwordHash:{
        type : String,
        required : true
    },
    createdAt:{
          type: Date,
          default: Date.now,
    }
});
const User = mongoose.model('User',userSchema)
export default User;