import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { UserApi } from '../../fw/users/user-api';


@Injectable()

// UserApi is at fw level  - abstract class
// UserService is now at app level 
export class UserService implements UserApi {

  isAuthenticated = true;

  constructor(private router: Router) { }


   signIn (username: string, password: string, rememberMe: boolean) : Observable<any>   {
        console.log('UserService.signIn: ' + username + ' ' +  password + ' ' + rememberMe);
        this.isAuthenticated = true;
        console.log ('is authenticated is ' + this.isAuthenticated);
        return Observable.of({}).delay(2000);
        // // test for error - replace original observable with an error
        // return Observable.of({}).delay(2000).flatMap(x=>Observable.throw('invalid user name and or password'));
    };
    
    signOut () {
        this.isAuthenticated=false;
        this.router.navigate(['/signin']);
        return Observable.of({});
    }
        
    

}
