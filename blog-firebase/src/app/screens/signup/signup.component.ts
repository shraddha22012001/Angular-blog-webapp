import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {UserService} from '../../services/user.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css','../../app.component.css']
})
export class SignupComponent implements OnInit {

 
  constructor(private fb:FormBuilder,private user:UserService) { }

  loginData=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  })

  signupData=this.fb.group({
    username:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    cpassword:['',[Validators.required]]
  })

  ngOnInit(): void {
  }

  handleLoginSubmit(){
    // console.log(this.loginData.value)
    if(this.loginData.status=='VALID'){
      this.user.login(this.loginData.value.email,this.loginData.value.password)
    }
  }
  handleSignupSubmit(){
    // console.log(this.signupData.status)
    if(this.signupData.status=='VALID'){
      if(this.signupData.value.password===this.signupData.value.cpassword){
        this.user.signup(this.signupData.value.email,this.signupData.value.password,this.signupData.value.username)

      }else{
        alert("password and confirm password does not match")
      }
    }
  }
  handleGoogleSignin(){
    this.user.SigninWithGoogle()
  }

}