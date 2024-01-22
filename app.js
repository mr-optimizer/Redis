const { setValue, getValue, deleteKey } = require('./redisConnect'); // Importing Redis functions


const test = async() => {
    console.log(await setValue('test', 'test', 10));
    console.log(await getValue('test'));
    console.log(await deleteKey('test'));
    console.log(await getValue('test'));
}

test();
