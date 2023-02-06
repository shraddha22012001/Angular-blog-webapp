import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable, Subject, switchMap } from 'rxjs';
import { GoogleAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: Observable<any>
  public user: any = {}

  constructor(private fireauth: AngularFireAuth, private afs: AngularFirestore,private router : Router) {
    this.userData = this.fireauth.authState;
  }

  getCurrentUserData() {
    let curr = sessionStorage.getItem('currUser') as string
    return JSON.parse(curr)
  }

  login(email: string, password: string) {
    this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.getLoggedInUserData(email) 
      })
      .catch(err => {
        alert("login failed")
      });
  }

  signup(email: string, password: string, username: string) {
    console.log(email, password)
    this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.saveUserToFireStore(email, username)
      })
      .catch(error => {
        alert("signup failed...please try again")
      });
  }

  signout() {
    this.fireauth
      .signOut();
  }

  // Firebase SignInWithPopup
  OAuthProviderSignin(provider: any) {
    return this.fireauth.signInWithPopup(provider)
      .then((res: any) => {
        this.createUserIfNotExist(res.additionalUserInfo.profile.email,res.additionalUserInfo.profile.name)
      }).catch((error) => {
        console.log(error)
      })
  }
  // Firebase Google Sign-in
  SigninWithGoogle() {
    return this.OAuthProviderSignin(new GoogleAuthProvider())
      .then(res => {
        console.log("signed in successfully")
      }).catch(error => {
        console.log(error)
      });
  }

  saveUserToFireStore(email: string, username: string) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection("users")
        .add({
          email: email,
          username: username
        })
        .then(res => {
          this.user.email = email
          this.user.username = username
          sessionStorage.setItem("currUser", JSON.stringify(this.user))
          window.location.href = "/blogs"
        }, err => reject(err));
    });
  }

  createUserIfNotExist(email:string,username:string){
    const email$ = new Subject<string>();
    const queryObservable = email$.pipe(
      switchMap(email =>
        this.afs.collection('users', ref => ref.where('email', '==', email)).valueChanges()
      )
    );
    queryObservable.subscribe((queriedItems: any[]) => {
      if (queriedItems.length > 0) {
        // user found
        this.user = queriedItems[0]
        sessionStorage.setItem("currUser", JSON.stringify(queriedItems[0]))
        this.router.navigate(['blogs']);
      }else{
        this.saveUserToFireStore(email, username)
      }
    });

    // invoke
    email$.next(email)
  }

  getLoggedInUserData(email:string) {
    const email$ = new Subject<string>();
    const queryObservable = email$.pipe(
      switchMap(email =>
        this.afs.collection('users', ref => ref.where('email', '==', email)).valueChanges()
      )
    );

    queryObservable.subscribe((queriedItems: any[]) => {
      if (queriedItems.length > 0) {
        // user found
        this.user = queriedItems[0]
        sessionStorage.setItem("currUser", JSON.stringify(queriedItems[0]))
        window.location.href = "/blogs"
      }
    });

    email$.next(email)
  }
}
