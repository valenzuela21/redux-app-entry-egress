import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {tap, take} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canLoad():Observable<boolean>{
    return this.auth.isAuth().pipe(
      tap( state =>{
        if(!state){
          this.router.navigate(['/login'])
        }
      }),
      take(1)
    );
  }

  canActivate():Observable<boolean>{
      return this.auth.isAuth().pipe(
        tap( state =>{
          if(!state){
              this.router.navigate(['/login'])
          }
        })
      );
  }

}
