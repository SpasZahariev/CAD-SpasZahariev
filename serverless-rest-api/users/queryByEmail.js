"use strict";

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.queryByEmail = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "users",
    FilterExpression: "#e = :e",
    ExpressionAttributeNames: {
      "#e": "email"
    },
    ExpressionAttributeValues: {
      ":e": data.email
    }
  };
  console.log("Attempting to query users for email: " + data.email);

  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Could not query dynamoDB!"));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    console.log(result);
    callback(null, response);
  });
};
