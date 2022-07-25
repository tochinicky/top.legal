
const dynamodb = require('../dynamoDbmanager')
const uuid= require('uuid').v4;

test('dynamodb as an object', () => {
    expect(typeof dynamodb.dynamodb).toBe('object');
})
test('dynamodb has create,getContract and getContractIDs', () => {
    expect(typeof dynamodb.dynamodb.create).toBe('function');
    expect(typeof dynamodb.dynamodb.getContract).toBe('function');
    expect(typeof dynamodb.dynamodb.getContractIDs).toBe('function');
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
        const res = await dynamodb.dynamodb.create(params);
        expect(res).toStrictEqual({});
    } catch (error) {
        console.log('error from dynamodb',error)
    }
}
)
test('dynamodb get works', async () => {
    expect.assertions(1);
    try {
        const res = await dynamodb.dynamodb.getContract(params.ContractID);
        
        expect(typeof res).toBe('object');
    } catch (error) {
        console.log('error from dynamodb',error)
    }
}
)
test('dynamodb get list works', async () => {
    expect.assertions(1);
    try {
        const res = await dynamodb.dynamodb.getContractIDs();
        expect(res).toEqual(array);
    } catch (error) {
        console.log('error from dynamodb',error)
    }
}
)

