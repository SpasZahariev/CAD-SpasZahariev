import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

const poolData = {
  UserPoolId: 'eu-west-1_aV39jcrGR',
  ClientId: '3ndme54orf4u1q3lfpqgcmv6d7'
};

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthorizationService {
  public cognitoUser: any;

  constructor() {}

  // adding a new user to pool
  public register(email, password) {
    const attributeList = [];

    return Observable.create(observer => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log('signUp error', err);
          observer.error(err);
        }

        this.cognitoUser = result.user;
        console.log('signUp success', result);
        // pushes one item into the observable and stops posting
        // cool async way
        observer.next(result);
        observer.complete();
      });
    });
  }

  // handle code that the user receved via email
  public confirmAuthCode(code) {
    const user = {
      Username: this.cognitoUser.username,
      Pool: userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log('confirmAuthCode() success', result);
        // pushes one item into the observable and stops posting
        observer.next(result);
        // the observable is returned but it could be empty in the start and then receive the userData
        observer.complete();
      });
    });
  }

  // handle signIn form
  public signIn(email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          // pushes one item into the observable and stops posting
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        }
      });
    });
  }

  public isLoggedIn() {
    return userPool.getCurrentUser() != null;
  }

  public getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  public logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }
}
