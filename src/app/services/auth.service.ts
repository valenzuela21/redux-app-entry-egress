import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from "@angular/fire/firestore";

//Store Reducer
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as authActions from "../auth/auth.actions";
import * as itemsActions from "../entry-exit/entry-exit.actions";

import {Subscription} from "rxjs";
import {map} from 'rxjs/operators';
import {User} from "../models/user.model";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription?: Subscription;
  private _user?:User | null;


  get user(){
    return {...this._user}
  }

  constructor(public auth:AngularFireAuth,
              public firestore:AngularFirestore,
              private store: Store<AppState>) { }


  initAuthListener(){
    this.auth.authState.subscribe(user=>{
      //Data inform User and user
      if(user){
        //Consult Firestore firebase
        this.userSubscription =  this.firestore.doc(`${user?.uid}/user`).valueChanges()
          .subscribe((firestoreUser:any) =>{
            const tempUser = User.fromFirebase(firestoreUser);
            this._user = tempUser;
            this.store.dispatch(authActions.setUser({user: tempUser}))
          });

      }else{
        this._user= null;
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(itemsActions.unsetItems());
        this.userSubscription?.unsubscribe()
      }
    })
  }

  createUser(name:string, email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        // @ts-ignore
        const newUser = new User(user.uid, name, user.email);
        // @ts-ignore
        return this.firestore.doc(`${user.uid}/user`)
          .set({...newUser});
      }

    );
  }

  loginUser(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(user => user != null )
    )
  }

}
