'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getProjects = (event, context, callback) => {
    const params = {
        TableName: 'projects'
    }

    console.log("Scanning projects");
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

