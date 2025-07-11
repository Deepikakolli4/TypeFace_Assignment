import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    category:{
         type : String,
         required : true
    },
    description:{
        type : String,
        required : true
    },
    type : {
        type : String,
        enum : ['income' , 'expense'],
        required : true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true
    }, 
    createdAt : {
        type : Date,
        default : Date.now
    }
});
const Transaction =  mongoose.model('Transaction',transactionSchema);
export default Transaction;