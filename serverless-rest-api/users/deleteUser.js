'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.deleteUser = (event, context, callback) => {
    const data = JSON.parse(event.body);

     const params = {
        TableName: 'users',
        Key:{
            "id": data.id
        }
    }

    console.log("Attempting to Delete a user");

    dynamoDB.delete(params, (error, result) => {
        if (error){
            console.error(error);
            callback(new Error('Could not delete USER from DynamoDB'));
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
