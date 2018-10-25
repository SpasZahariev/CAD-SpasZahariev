'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');
const ddb = new AWS.DynamoDB.DocumentClient();

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'v1.0 Your function executed successfully! Spas:Cmon this time pls',
      input: event,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  };
};

module.exports.imageResize = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify([
      {
      message: 'Resized your Image! are you kidding me?!!',
      },
      {
      message: 'Double the trouble',
      },
      {
      message: 'Triple The fun',
      },
    ]),
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  };
};

// module.exports.postUser = async (event, context, callback) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Resized your Image! are you kidding me?!!',
//     }),
//     headers: {
//       "Access-Control-Allow-Origin": "*"
//     },
//   };
//   var params = {
//     Item: {
//       userID: uuidv4(),
//       userRole: "Developer",
//       email: "spasedno@abv.bg",
//       assignment: "Project0"
//     },

//     TableName: 'usersCAD'
//   };

//   docClient.put(params, function(err, data){
//     if(err){
//       callback(err, null);
//     }else{
//       callback(null, data);
//     }
//   });
// };

module.exports.postUser = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(new Error('what have you sent to me?'));
  }
  const params = {
    TableName: USER_TABLE_NAME,
    Item: {
      userId: uuid.v1(),
      checked: false,
    }
  }

  ddb.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Cannot insert the user!'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(results.Item)
    }
    callback(null, response);
  })

  // if(event.httpMethod === "POST" && event.body){
  //   let json = JSON.parse(event.body);
  //   const id = json.userId;
  //   recordUser(id).then(() => {
  //     callback(null, {
  //       statusCode: 201,
  //       body: JSON.stringify({
  //         message: 'Woohoo! You sent a JSON user',
  //         object: json
  //       }),
  //       headers: {
  //         "Access-Control-Allow-Origin": "*"
  //       },
  //     });
  //   }).catch((err) => {
  //     console.error(err);
  //     errorResponse(err.message, context.awsRequestId, callback);
  //   });
  // }
  // if (event.queryStringParameters){
  //   return callback(null, {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       message: 'Yesss! You sent ' + queryStringParameters,
  //     }),
  //     headers: {
  //       "Access-Control-Allow-Origin": "*"
  //     },
  //   });
  // }
};
