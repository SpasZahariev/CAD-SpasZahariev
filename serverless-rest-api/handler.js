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