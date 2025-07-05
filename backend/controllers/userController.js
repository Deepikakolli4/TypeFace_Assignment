import userService from '../services/userService.js'
import Transaction from '../models/Transaction.js';
const {registerUserService,loginUserService} = userService;
const registerUser = async(req,res) => {
    try{
       await registerUserService(req.body.username,req.body.email,req.body.password);
       res.status(201).json({
        message : 'User registered Successfully'
       });
    }catch(error){
        res.status(400).json({
            message : error.message
        })
    }
}

const loginUser = async(req,res) => {
      try{
      const { token , user} = await loginUserService(req.body.email,req.body.password);
       res.json({
        token,
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
       })
      }catch(error){
        res.status(400).json({
            message : error.message
        })
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
export default {registerUser,loginUser,getUserTransactions};