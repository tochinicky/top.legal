const uuid = require('uuid').v4;

const db  = require('../dynamoDbmanager');

const getContract = async(req,res) => {
    const {id} = req.query;
    try {
        const data = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {ContractID:id}
    
        }
        const result = await db.dynamodb.get(data);
        return res.json(result);
      } catch (error) {
        console.log(error)
          return res.status(500).json(error);
      }
}
const createContract = async (req,res) => {
    try {
        if(!req.body) return res.json({message:'request body is required'})
        const {userID,contractName,templateID} = req.body;

        const contract = {
            ContractID: uuid(),
            userID,
            contractName,
            templateID
        }
        const data ={
            TableName: process.env.DYNAMODB_TABLE,
            Item: contract
          }
        await db.dynamodb.create(data);
        return res.json({ContractID:contract.ContractID});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
    
}

const getContractIDs = async (req, res) => {
    try {
        const results  = await db.dynamodb.list(process.env.DYNAMODB_TABLE);
       return res.json(results);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}
module.exports = {createContract,getContract,getContractIDs}
