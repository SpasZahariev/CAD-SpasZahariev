"use strict";

const AWS = require("aws-sdk");
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
  region: "eu-west-1"
});

module.exports.postToCognito = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    MessageAction: "SUPPRESS",
    TemporaryPassword: "temporary",
    UserAttributes: [
      {
        Name: "email",
        Value: data.email
      }
    ],
    Username: data.email,
    UserPoolId: "eu-west-1_aV39jcrGR"
  };

  console.log("attempting to add " + data.email + " to cognito");
  cognitoIdentityServiceProvider.adminCreateUser(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Could not add user to Cognito!"));
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify('sucessfully added a new account to cognito'),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    callback(null, response);
  });
};
