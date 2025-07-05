import transactionService from '../services/transactionService.js';

const createTransaction = async (req, res) => {
  try {
    const newTransaction = await transactionService.createTransactionService(req.user.userId, req.body);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const { start, end, page, limit,type} = req.query;
    const transactions = await transactionService.getTransactionService(req.user.userId, { start, end, page, limit,type });
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionService.deleteTransactionService(req.user.userId, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransactionSummary = async (req, res) => {
  try {
    const summary = await transactionService.getTransactionSummaryService(req.user.userId);
    res.json(summary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getUserTransactions = async (req, res) => {
  try {
    const userId = req.params.id;

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const uploadReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await transactionService.uploadReceiptService(req.file, req.user.userId);

    res.json({
      extractedLines: result.extractedLines,
      createdTransactions: result.createdTransactions
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const extractedData = await transactionService.uploadPdfService(req.file, req.user.userId);
    res.json(extractedData);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export default {
  createTransaction,
  getTransaction,
  deleteTransaction,
  getTransactionSummary,
  getUserTransactions,
  uploadReceipt,
  uploadPdf
};
