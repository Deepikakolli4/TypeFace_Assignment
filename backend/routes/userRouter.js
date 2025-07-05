import express from 'express';
import userController from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleWare.js';
const {registerUser,loginUser} = userController
const router = express.Router();



router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/:id/transactions', authenticateToken, userController.getUserTransactions);
export default router;