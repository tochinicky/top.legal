
const dynamodb = require('../dynamoDbmanager')
const uuid= require('uuid').v4;
const dotenv = require('dotenv');
dotenv.config();

test('dynamodb as an object', () => {
    expect(typeof dynamodb.dynamodb).toBe('object');
})
test('dynamodb has create,getContract and getContractIDs', () => {
    expect(typeof dynamodb.dynamodb.create).toBe('function');
    expect(typeof dynamodb.dynamodb.get).toBe('function');
    expect(typeof dynamodb.dynamodb.list).toBe('function');
})
const params = {
	userID:"123456765",
	contractName:"anotherone+1",
	templateID:"76543456",
    ContractID:uuid()
}
let array = [params];
test('dynamodb write works', async () => {
    expect.assertions(1);
    try {
        const data ={
            TableName: process.env.CONTRACT_TABLE,
            Item: params
          }
        const res = await dynamodb.dynamodb.create(data);
        expect(res).toStrictEqual({});
    } catch (error) {
        console.log('error from dynamodb',error)
    }
}
)
test('dynamodb get works', async () => {
    expect.assertions(1);
    try {
        const res = await dynamodb.dynamodb.get(params.ContractID);
        
        expect(typeof res).toBe('object');
    } catch (error) {
        console.log('error from dynamodb',error)
    }
}
)
test('dynamodb get list works', async () => {
    expect.assertions(1);
    try {
        const data ={
            TableName: process.env.CONTRACT_TABLE
          }
        const res = await dynamodb.dynamodb.list(data);
        expect(res).toEqual(array);
    } catch (error) {
        console.log('error from dynamodb',error)
    }
}
)

