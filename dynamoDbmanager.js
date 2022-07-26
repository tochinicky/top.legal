
  'use strict'

const { DynamoDB } = require("aws-sdk")
//dev purpose only
  let options = {
    region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'fakeMyKeyId',
        secretAccessKey: 'fakeSecretAccessKey'
  };
  const documentClient = new DynamoDB.DocumentClient(options)

  const dynamodb = {
    create: async (params)=>{
     const result =  await documentClient.put(params).promise();
      return result;
    },
    list: async (table_name)=>{
      try {
        const results= await documentClient.scan({
            TableName: table_name
        }).promise();
       return results.Items;
    } catch (error) {
        return {error:error.message};
    }
    },
    get: async (data)=>{
      try {
        const result =  await documentClient.get(data).promise();
        return result.Item;
      } catch (error) {
        
          return {error:error.message};
      }
    }
  }
  module.exports = {dynamodb}

