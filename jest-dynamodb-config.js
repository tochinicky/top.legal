module.exports = {
    tables:[
        {
            TableName: 'Contractmanagement',
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