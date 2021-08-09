import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from "rxjs";
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from 'src/app/model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const loginUrl = '/login';
const signUpUrl = '/usuario/sign-up';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $obUsuario = new Subject<User>();
  private user: User;

  constructor(private http: HttpClient) {
    this.user = new User();
  }

  login (user: User): Observable<boolean> {
    return this.http.get<boolean>(
              environment.urlBackend + loginUrl
               + '?username=' + user.username
              + '&password=' + user.password)
        .pipe(
          catchError(this.handleError('login', false)),
          tap (
            (data: boolean) => {
              if (data == true) {
                this.user = user;
                this.$obUsuario.next(user);
              }
            },
            err => {
                console.error(err);
            }
         )
        )
  }

  signUp (user: User): Observable<void> {
  	return this.http.post<void>( environment.urlBackend + signUpUrl,
            JSON.stringify(user),
            httpOptions
        ).pipe(
    //         catchError(this.handleError('signUp', null))
          tap (
            (httpStatus) => {
              //if (httpStatus) {
                this.user = user;
                this.$obUsuario.next(user);
              //}
            }
          )
        );
  }

  logOut() {
    this.user = new User;
    this.$obUsuario.next(this.user);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
