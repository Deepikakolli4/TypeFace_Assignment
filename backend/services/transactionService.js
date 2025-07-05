import Transaction from '../models/Transaction.js'
import Tesseract from 'tesseract.js';
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);;
const path = require('path');
const pdfParse = require('pdf-parse'); // Add pdf-parse dependency
const createTransactionService = async( userId , data )=>{
    try{
        const transaction = new Transaction({...data,userId});
        return await transaction.save();
    }catch(error){
        console.log(error.message);
    }
};

const getTransactionService = async (userId, { start, end, page = 1, limit = 10,type }) => {
  try {
    const query = { userId };

    if (start && end) {
      query.date = { $gte: new Date(start), $lte: new Date(end) };
    }
      if (type && type !== 'all') {
    query.type = type;
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

const uploadReceiptService = async (file, userId) => {
  try {
    const imagePath = file.path;

    const result = await Tesseract.recognize(imagePath, 'eng');
    const extractedText = result.data.text;
    const lines = extractedText.split('\n').filter(line => line.trim() !== '');

    const createdTransactions = [];

    for (const line of lines) {
      let title, amount;

      if (line.includes('-')) {
        [title, amount] = line.split('-').map(s => s.trim());
      } else {
        const parts = line.trim().split(' ');
        amount = parseFloat(parts[parts.length - 1]);
        title = parts.slice(0, parts.length - 1).join(' ');
      }

      if (!isNaN(amount) && title) {
        const transaction = new Transaction({
          title,
          amount,
          type: 'expense',
          category: 'Receipt',
          description: 'Auto-generated from receipt',
          date: new Date(),
          userId
        });

        await transaction.save();
        createdTransactions.push(transaction);
      }
    }

    return {
      extractedLines: lines,
      createdTransactions
    };
  } catch (error) {
    console.log('Error in uploadReceiptService:', error.message);
    throw error;
  }
};


const uploadPdfService = async (file, userId) => {
  try {
    const pdfPath = file.path;

    // 1. Read and parse the PDF
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    // Split text into lines and filter out empty lines
    const lines = text.split('\n').filter(line => line.trim() !== '');

    const extractedLines = [];
    const createdTransactions = [];

    // 2. Parse table rows (assuming table starts after '| Description |' header)
    let isTable = false;
    for (const line of lines) {
      extractedLines.push(line);

      // Detect table start
      if (line.includes('| Description |')) {
        isTable = true;
        continue;
      }

      // Process table rows
      if (isTable && line.includes('|')) {
        // Split table row by '|' and trim
        const columns = line.split('|').map(s => s.trim()).filter(s => s !== '');

        // Ensure we have Description and Total (4 columns: Description, Quantity, Unit Price, Total)
        if (columns.length >= 4) {
          const description = columns[0];
          const total = parseFloat(columns[3].replace(/[^0-9.]/g, '')); // Extract numeric total

          // Create transaction if valid
          if (!isNaN(total) && description) {
            const transaction = new Transaction({
              title: description,
              amount: total,
              type: 'expense',
              category: 'Receipt',
              description: 'Auto-generated from PDF table',
              date: new Date(),
              userId,
            });

            await transaction.save();
            createdTransactions.push(transaction);
          }
        }
      }

      // Stop table parsing after the table ends (e.g., when 'Total:' is encountered)
      if (line.includes('Total:') || line.includes('Payment Info')) {
        isTable = false;
      }
    }

    // 3. Delete the original PDF
    fs.unlinkSync(pdfPath);

    return {
      message: 'Transactions created from scanned PDF',
      extractedLines,
      createdTransactions,
    };
  } catch (error) {
    console.error('Error in uploadPdfService:', error.message);
    throw error;
  }
};


export default {
    createTransactionService,
    getTransactionService,
    deleteTransactionService,
    getTransactionSummaryService,
    uploadReceiptService,
    uploadPdfService
}