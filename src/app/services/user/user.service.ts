import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from "rxjs";
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from 'src/app/model/user';
import { UserSession } from 'src/app/model/user.session';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsTextResponses = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'text/plain'
  })
};
const loginUrl = '/login';
const signUpUrl = '/usuario/sign-up';
const userSessionsUrl = '/user-sessions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $obUsuario = new Subject<User>();
  private user: User;

  constructor(private http: HttpClient) {
    this.user = new User();
  }

  login(user: User): Observable<boolean> {
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

  signUp(user: User): Observable<String> {
  	return this.http.post<String>( environment.urlBackend + signUpUrl,
            JSON.stringify(user),
            httpOptionsTextResponses
        ).pipe(
          catchError(this.handleError('signUp', "")),
          tap (
            (data) => {
              if (data != null) {
                this.user = user;
                this.$obUsuario.next(user);
              }
            }
          )
        );
  }

  getUserSessions(): Observable<Array<UserSession>> {
  	return this.http.get<Array<UserSession>>(environment.urlBackend + userSessionsUrl
            +'?username='+this.user.username
        ).pipe(
          catchError(this.handleError('signUp', Array<UserSession>()))
        );
  }

  logOut(): void {
    this.user = new User();
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
