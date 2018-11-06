'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.updateProject = (event, context, callback) => {
    const data = JSON.parse(event.body);

     const params = {
        TableName: 'projects',
        Key:{
            "id": data.id
        },
        UpdateExpression: "set #n = :n, #s = :s, #m =:m, #d = :d",
        ExpressionAttributeNames:{
          "#n": "name",
          "#s": "status",
          "#m": "manager",
          "#d": "developers",
        },
        ExpressionAttributeValues:{
            ":n":data.name,
            ":s":data.status,
            ":m":data.manager,
            ":d":data.developers
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
