const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
module.exports= (req,res,next)=>{
    try {
        if (!req.headers.authorization) return res.status(401).json({message: 'no authorization header'});
    const authorizationHeader = req.headers.authorization;
    const [bearer, token] = authorizationHeader.split(' ');
    console.log(bearer,token)
    if (bearer !== 'Bearer') {
      return res.status(401).json({message: 'Invalid Bearer,please provide a valid JWT token'});
    }
    if (!token) {
        return res.status(401).json({message: 'Invalid token,please provide a valid JWT token'});
     }
     const decoded = jwt.verify(token,process.env.JWT_KEY);
      req.userData = decoded;

     next();
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
    
}