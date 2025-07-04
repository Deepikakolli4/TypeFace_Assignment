import  jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req,res,next){
      try{
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) {
            return res.status(401).json({
                message : 'Token missing'
            })
        }

        req.user = jwt.verify(token,JWT_SECRET);
        next();
      }catch(error){
        res.status(403).json({
            message : 'Invalid Token'
        });
      }
}

export default authenticateToken;