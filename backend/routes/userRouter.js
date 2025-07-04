import express from 'express';
import userController from '../controllers/userController.js';
const {registerUser,loginUser} = userController
const router = express.Router();



router.post('/register',registerUser);
router.post('/login',loginUser);
export default router;