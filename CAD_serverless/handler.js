'use strict';

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

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.imageResize = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Resized your Image! are you kidding me?!!',
    }),
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

module.exports.postUser = async (event, context) => {

  if(event.httpMethod === "POST" && event.body){
    let json = JSON.parse(event.body);

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Woohoo! You sent a JSON',
        object: json
      }),
      headers: { 
        "Access-Control-Allow-Origin": "*" 
      },
    });
  }
  if (event.queryStringParameters){
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Yes! You sent ' + queryStringParameters,
      }),
      headers: { 
        "Access-Control-Allow-Origin": "*" 
      },
    });
  }
};
