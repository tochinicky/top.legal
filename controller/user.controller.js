const uuid = require('uuid').v4;

const db  = require('../dynamoDbmanager');
const bcrypt = require('bcrypt');

const signUp = async (req,res) => {
    try {
        if(!req.body) return res.json({message:'request body is required'})
        const {email,password} = req.body;
        const data = {
            TableName: process.env.USERS_TABLE,
            Key: {email:email}
    
        }
       const result =  await db.dynamodb.get(data);
       if(result >=1) return res.status(409).json({message:'mail exists'});
 
          bcrypt.hash(password,10, (error,hash) =>{
            if(error){
                return res.json({message:'error generating password'})
            } else {
                const user = {
                    id: uuid(),
                    email,
                    password
                }
                await db.dynamodb.create(user);
                return res.json({message:'user created successfully',userID: user.id});
            }
        })
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
    
}