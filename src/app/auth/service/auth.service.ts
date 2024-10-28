import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveUser, User } from '../../types/user';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* private activeUser?: ActiveUser; */
  private activeUserSubject = new BehaviorSubject<ActiveUser | undefined>(undefined);
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  auth(): Observable<ActiveUser | undefined> {
    return this.activeUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.baseUrl}?username=${username}`).pipe(
      map((users) => {
        const user = users.at(0);
        if (user && user.username == username && user.password == password) {
          /* this.activeUser = { username: user.username, id: user.id! }; */
          this.activeUserSubject.next({ username: user.username, id: user.id! });
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): Observable<boolean> {
    /* this.activeUser = undefined; */
    this.activeUserSubject.next(undefined);
    return of(true);
  }

  signup(user: User): Observable<boolean> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      map(({ id, username }) => {
        if (id) {
          /* this.activeUser = { id, username }; */
          this.activeUserSubject.next({id, username});
          return true;
        }
        return false;
      })
    );
  }
}
