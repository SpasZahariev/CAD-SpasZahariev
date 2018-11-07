'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.updateUser = (event, context, callback) => {
    const data = JSON.parse(event.body);

     const params = {
        TableName: 'users',
        Key:{
            "id": data.id
        },
        UpdateExpression: "set #n = :n, #e = :e, #p =:p, #a = :a",
        ExpressionAttributeNames:{
          "#n": "name",
          "#e": "email",
          "#p": "position",
          "#a": "assignment",
        },
        ExpressionAttributeValues:{
            ":n":data.name,
            ":e":data.email,
            ":p":data.position,
            ":a":data.assignment
        }
    }

    console.log("Attempting to Update User");
    dynamoDB.update(params, (error, result) => {
        if (error){
            console.error(error);
            callback(new Error('Could not update user in dynamoDB!'));
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
