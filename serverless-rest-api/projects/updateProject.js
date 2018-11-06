'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.updateProject = (event, context, callback) => {
    // const data = JSON.parse(event.body);

    // if (typeof data.name !== 'string'){
    //     console.error('Validation Failed!?');
    //     callback(new Error('Can not create this project. Text is not VALIDATABLE'));
    //     return;
    // }
    const params = {
        TableName: 'projects',
        Key:{
            "id": "b83bfb00-e1bc-11e8-987e-43971b0d1f3c"
        },
        UpdateExpression: "set #n = :n, #s = :s, #m =:m, #d = :d",
        ExpressionAttributeNames:{
          "#n": "name",
          "#s": "status",
          "#m": "manager",
          "#d": "developers",
        },
        ExpressionAttributeValues:{
            ":n": "NEW test update NEW",
            ":s":"Complete",
            ":m":"Yoyo",
            ":d":[]
        }
    }
    console.log(params);

    dynamoDB.update(params, (error, result) => {
        if (error){
            console.error(error);
            callback(new Error('Could not update project in dynamoDB!'));
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
