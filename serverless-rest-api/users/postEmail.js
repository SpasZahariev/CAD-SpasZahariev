"use strict";

const AWS = require("aws-sdk");
const sgMail = require("@sendgrid/mail");


module.exports.postEmail = (event, context, callback) => {
  const data = JSON.parse(event.body);


  sgMail.setApiKey("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");
  const msg = {
    to: data.recipients,
    from: "spas.zah@gmail.com",
    subject: data.sender,
    text: data.text,
    html: data.text
  };
  sgMail.sendMultiple(msg).then((res) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
      callback(null, response);
  })
  .catch(error => {

    //Log friendly error
    console.error(error.toString());

    callback(error, null)
  });;
};
