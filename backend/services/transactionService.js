import Transaction from '../models/Transaction.js'
// import Tesseract from 'tesseract.js';
// import pdfParse from 'pdf-parse';
// import fs from 'fs';
const createTransactionService = async( userId , data )=>{
    try{
        const transaction = new Transaction({...data,userId});
        return await transaction.save();
    }catch(error){
        console.log(error.message);
    }
};

const getTransactionService = async (userId, { start, end, page = 1, limit = 10 }) => {
  try {
    const query = { userId };

    if (start && end) {
      query.date = { $gte: new Date(start), $lte: new Date(end) };
    }

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
      console.log(transactions);
    return transactions;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteTransactionService = async(userId,transactionId)=>{
    try{
       await Transaction.deleteOne({_id:transactionId,userId})
    }catch(error){
      console.log(error.message);
    }
};

const getTransactionSummaryService = async(userId) => {
      try{
         const transactions = await Transaction.find({userId});
         const summary = {totalIncome : 0, totalExpense: 0};
         transactions.forEach(tx =>{
            if(tx.type === 'income') summary.totalIncome += tx.amount;
            else if(tx.type === 'expense') summary.totalExpense += tx.amount;
         });
         return summary;
      }catch(error){
        console.log(error.message);
      }
};

// const uploadReceiptService = async (file, userId) => {
//   try {
//     const imagePath = file.path;

//     const result = await Tesseract.recognize(imagePath, 'eng');
//     const extractedText = result.data.text;

//     const lines = extractedText.split('\n').filter(line => line.trim() !== '');

//     return {
//       extractedLines: lines
//     };
//   } catch (error) {
//     console.log('Error in uploadReceiptService:', error.message);
//     throw error;  
//   }
// };

// const uploadPdfService = async (file, userId) => {
//   try {
//     console.log('File path:', file.path);
//     if (!fs.existsSync(file.path)) {
//       throw new Error(`File not found at: ${file.path}`);
//     }
//     const pdfBuffer = fs.readFileSync(file.path);
//     const data = await pdfParse(pdfBuffer);
//     const lines = data.text.split('\n').filter(line => line.trim() !== '');
//     fs.unlinkSync(file.path); // Clean up
//     return { extractedLines: lines };
//   } catch (error) {
//     console.log('Error in uploadPdfService:', error.message);
//     throw error;
//   }
// };


export default {
    createTransactionService,
    getTransactionService,
    deleteTransactionService,
    getTransactionSummaryService,
    // uploadReceiptService,
    // uploadPdfService
}