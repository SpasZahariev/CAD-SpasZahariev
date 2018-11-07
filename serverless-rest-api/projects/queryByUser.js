'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.queryByUser = (event, context, callback) => {
    const data = JSON.parse(event.body);

    const params = {
      TableName: "projects",
      FilterExpression: "contains (developers, :dev)",
      ExpressionAttributeValues: {
          ":dev": {
              id : data.id,
              name : data.name,
              email : data.email,
              position : data.position,
              assignment : data.assignment,
          }
      }
  };
    console.log("Attempting to query all Projects this user is working on: " + data.name);

    dynamoDB.scan(params, (error, result) => {
        if (error){
            console.error(error);
            callback(new Error('Could not put in dynamoDB!'));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
        }
        callback(null, response);
    })
}
