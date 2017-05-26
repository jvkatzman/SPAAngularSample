import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NgForm} from '@angular/forms';

import { UserApi} from '../user-api';

@Component({
  selector: 'fw-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  formError: string;
  submiting = false;

  constructor(private userApi: UserApi,
              private router: Router) { }

  onSubmit(signInForm: NgForm){
    if (signInForm.valid){
      console.log('submitting...', signInForm);
      this.submiting=true;
      this.formError=null;

      // don't have to unsubscribed because it's short lived
      this.userApi.signIn(signInForm.value.username,signInForm.value.password, signInForm.value.rememberMe)
      .subscribe((data)=> {
        console.log('got valid: ', data);
        this.router.navigate(['/authenticated']);
      },
      (err) => {
        this.submiting=false;
        console.log('got error: ', err);
        this.formError=err;
      }

      );
    }
  }



  ngOnInit() {
  }

}
