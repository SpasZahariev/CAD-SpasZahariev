'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if (typeof data.text !== 'string'){
        console.error('Validation Failed!?');
        callback(new Error('Can not create this user. Text is not VALIDATABLE :D'));
        return;
    }
    const params = {
        TableName: 'users',
        Item: {
            id: uuid.v1(),
            text: data.text,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    }

    dynamoDB.put(params, (error, result) => {
        if (error){
            console.error(error);
            callback(new Error('Could not put in dynamoDB!'));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item),
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
        }
        callback(null, response);
    })
}
