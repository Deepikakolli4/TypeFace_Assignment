import express from "express";
import authenticateToken from '../middleware/authMiddleWare.js';
import transactionController from '../controllers/transactionController.js';
import uploadMiddleWare from '../middleware/uploadMiddleWare.js';

const router = express.Router();

router.post('/create', authenticateToken, transactionController.createTransaction);
router.get('/', authenticateToken, transactionController.getTransaction);
router.delete('/:id', authenticateToken, transactionController.deleteTransaction);
router.get('/summary', authenticateToken, transactionController.getTransactionSummary);
// router.post('/receipt-upload', authenticateToken, uploadMiddleWare.single('receipt'), transactionController.uploadReceipt);
// router.post('/pdf-upload', authenticateToken, uploadMiddleWare.single('pdf'), transactionController.uploadPdf);


export default router;
