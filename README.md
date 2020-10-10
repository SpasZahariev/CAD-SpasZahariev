## Project Management Webite for Cloud App Development University module

![alt text](https://github.com/SpasZahariev/CAD-SpasZahariev/blob/master/src/assets/resources/repo-image.PNG)

## Link to live application: [Project Management Application](http://spas-zahariev.cad.s3-website.eu-west-1.amazonaws.com/)

## Description
- Angular Web application for organising developers and projects.
- Users can register and confirm their account by responding to a verification email
- Once registered, users have the default **Developer** role with limited entitlements but their role can be promoted to **Manager** or **Admin**
- Managers can create projects and assign people to them
- Profiles include information about the projects a **Developer** is involved in.
- Dashboard page to filter based on user and project features.
- There is a feature to compose and send emails to everyone in a specific project. The email sending page can also be used to send emails to individuals.


## Technologies used
- Angular 6
- Typescript/Javascript
- Serverless Framework - For configuring and deploying logic to AWS Lambda
- Sendgrid - Service for sending emails
- AWS Cognito - Provides tools for authentication, authorisation, and stores user accounts
- AWS S3 - Serves the static web files
- AWS Lambda - Functions as a Service Business Logic
- AWS Dynamo DB - No SQL DB for storing/accessing the project information 


## Local Setup
1. Use a terminal inside the root project folder:
2. Run `npm install`
3. Run `npm start`

## Running unit tests

Runinning `ng test` will execute unit tests on the [Karma](https://karma-runner.github.io) platform.
Run `ng test --code-coverage` to generate a `Code Coverage` report. This will generate a `coverage` folder and inside you can find an `index.html` file that will show all the statistics

## Accounts to Demo Authentication and Entitlements:

• username: developer_sz6u16@gmail.com • password: Admin1

• username: manager_sz6u16@gmail.com • password: Admin1

• username: admin_sz6u16@gmail.com • password: Admin1

## Additional Pictures

<img src="./src/assets/resources/login-screen.PNG">
<img src="./src/assets/resources/project-dashboard.PNG">
<img src="./src/assets/resources/restricted-dev.PNG">
<img src="./src/assets/resources/user-info.PNG">


