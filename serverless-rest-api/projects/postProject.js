'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.postProject = (event, context, callback) => {
    const data = JSON.parse(event.body);

    if (typeof data.name !== 'string'){
        console.error('Validation Failed!?');
        callback(new Error('Can not create this project. Text is not VALIDATABLE'));
        return;
    }
    const params = {
        TableName: 'projects',
        Item: {
            id: uuid.v1(),
            name: data.name,
            status: data.status,
            manager: data.manager,
            developers: data.developers,
        }
    }
    console.log(params);

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
