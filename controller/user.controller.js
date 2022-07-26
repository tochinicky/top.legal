const uuid = require('uuid').v4;

const db  = require('../dynamoDbmanager');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const signUp = async (req,res, next) => {
    try {
        if(!req.body) return res.json({message:'request body is required'})
        const {email,password} = req.body;
        const data = {
            TableName: process.env.USERS_TABLE,
            Key: {email:email}
    
        }
       const result =  await db.dynamodb.get(data);
       if(result) return res.status(409).json({message:'mail exists'});
 
          bcrypt.hash(password,10, (error,hash) =>{
            if(error){
                return res.json({message:'error generating password'})
            } else{
                const user = {
                    id: uuid(),
                    email,
                    password:hash
                }
                const create ={
                    TableName: process.env.USERS_TABLE,
                    Item: user
                  }
                db.dynamodb.create(create);
                return res.json({message:'user created successfully'});
            }
        })
        
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }

    
}
const login = async (req, res, next) => {
    try {
        if(!req.body) return res.json({message:'request body is required'})
        const {email,password} = req.body;
        const data = {
            TableName: process.env.USERS_TABLE,
            Key: {email:email}
    
        }
        const result =  await db.dynamodb.get(data);
        if(!result) return res.status(409).json({message:'email does not exist'});
      
        bcrypt.compare(password,result.password, (err,response)=>{
          
            if(err) return res.status(401).json({message:'Auth failed'});
            if(response){
                const token  =jwt.sign({
                    email: email,
                    userID: result.id,
                },process.env.JWT_KEY,{
                    expiresIn:"1h"
                })
                return res.status(200).json({message:'Auth succeeded',token:token,userID:result.id});
            }
            return res.status(401).json({message:'Auth failed'});
        })
    } catch (error) {
        
    }
}

module.exports ={signUp,login}