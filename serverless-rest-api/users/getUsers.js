'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getUsers = (event, context, callback) => {
    const params = {
        TableName: 'users'
    }

    console.log("Scanning users");
    dynamoDB.scan(params, (err, data) => {
        if(err){
          console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
          callback(err, null)
        } else {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(data.Items),
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
          });
        }
    });
}

