const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    tables:[
        {
            TableName: process.env.CONTRACT_TABLE,
            AttributeDefinitions: [
            {
                AttributeName: 'ContractID',
                AttributeType: 'S'
            }
        ],
            KeySchema: [
            {
                AttributeName: "ContractID",
                KeyType: 'HASH'
            },
            
           
        ],
        BillingMode: 'PAY_PER_REQUEST',
         
    
        }
    ]
}