# CAD-SpasZahariev


project uses the `Angular CLI: 6.2.5`

packages include:
* Angular Material: `@angular/material`
* Serverless Framework `serverless`
* Authentication with `amazon-cognito-identity-js`
* Sending emails with `@sendgrid/mail`

![alt text](https://github.com/SpasZahariev/CAD-SpasZahariev/blob/master/src/assets/resources/repo-image.PNG)
## Deployed and working on http://spas-zahariev.cad.s3-website.eu-west-1.amazonaws.com/

## Setup

inside root project folder:
Run `npm install`

## Development environment

Run `ng serve` for a dev server. Enter `http://localhost:4200/` in your browser's search bar or run `ng serve --o` and it will both run and open a window for you. If any of the angular files are edited - the web page will reload automatically.

## Build

Run `ng build` to build the project. Use the `--prod` flag for a production build. This will create a new `dist` with the project ready inside

## Running unit tests

Runinning `ng test` will execute unit tests on the [Karma](https://karma-runner.github.io) platform.
Run `ng test --code-coverage` to generate a `Code Coverage` report. This will generate a `coverage` folder and inside you can find an `index.html` file that will show all the statistics
