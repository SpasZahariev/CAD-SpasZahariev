'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.postUser = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(new Error('what have you sent to me?'));
  }
  const params = {
    TableName: process.env.USER_TABLE_NAME,
    Item: {
      userId: uuid.v1(),
      checked: false,
    }
  }

  ddb.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Cannot insert the user!'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
    callback(null, response);
  })
};
