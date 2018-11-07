'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getUser = (event, context, callback) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'users',
        Key:{
          "id": data.id
        }
    }

    console.log("Attempting to GET a user");
    dynamoDB.get(params, (err, data) => {
        if(err){
          console.error("Unable to GET UserItem from Table: ", JSON.stringify(err, null, 2));
          callback(err, null)
        } else {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(data.Item),
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
          });
        }
    });
}

