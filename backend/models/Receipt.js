import mongoose from "mongoose";
const receiptSchema = mongoose.Schema({
      transactionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Transaction',
        required : true
      },
      filePath : {
        type : 'String',
        required : true
      },
      extractedText:{
        type : 'String'
      },
      uploadedAt:{
        type : Date,
        default : Date.now,
      }
});
const Receipt = mongoose.model('Receipt',receiptSchema);
export default Receipt;