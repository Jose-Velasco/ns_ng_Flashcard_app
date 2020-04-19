import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RouterExtensions } from "nativescript-angular/router";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError, of } from "rxjs";
import { alert } from 'tns-core-modules/ui/dialogs';
import { User } from "./user.model";
import { setString, getString, hasKey, remove } from 'tns-core-modules/application-settings';

// this is the production api key
// const djangoRestAPIKey = "wlLzgcGb.ewqdJtzzDOK8HtriS7qVkUhJoXyS5CJh"

// this is the development key
const djangoRestAPIKey = "6W1I6JR3.3ZNBdUXljdTzndcz8CMAGHjnFUkxHMnB"

@Injectable({providedIn: "root"})
export class AuthService {
    private _user = new BehaviorSubject<User>(null);
    baseUrl = "http://45.79.225.82:80";
    httpHeaders = new HttpHeaders ({"Content-Type": "application/json"});

    constructor(
        private http: HttpClient,
        private router: RouterExtensions) {}

    get user() {
        return this._user.asObservable();
    }

    signUp(email: string, password: string) {
        const body = {email: email, password: password}
        return this.http.post<User>(
            this.baseUrl + "/flashcardApi/users/", body,
            {headers: {
                "Content-Type": "application/json",
                "Authorization": `Api-Key ${djangoRestAPIKey}`}}
        ).pipe(catchError(errorRes => {
            this.handleError(errorRes.error);
            return throwError(errorRes);
        }),
        tap(resData => {
            alert("Signup successful! Please login.");
        }));
    }

    login(email: string, password: string) {
        const body = {email: email, password: password}
        return this.http.post<User>(this.baseUrl + "/auth/", body, {headers: this.httpHeaders})
            .pipe(catchError(errorRes => {
                this.handleError(errorRes.error);
                return throwError(errorRes);
            }),
            tap(resData => {
                if(resData) {
                    this.handleLogin(email, resData["token"]);
                }
            }));
    }

    autoLogin() {
        if (!hasKey("userData")) {
            return of(false);
        }
        const userData: {email: string, _token: string} = JSON.parse(getString("userData"));
        const loadedUser = new User(userData.email, userData._token)
        if (loadedUser.isAuth) {
            this._user.next(loadedUser);
            return of(true);
        }
        return of(false);
    }

    logout() {
        this._user.next(null);
        remove("userData");
        this.router.navigate(['/auth'], { clearHistory: true});
    }

    private handleLogin(email: string, token: string) {
        const user = new User(email, token);
        setString("userData", JSON.stringify(user));
        this._user.next(user);
    }

    private handleError(errorMessage) {
        if (errorMessage.email) {
            alert(errorMessage.email);
        } else if (errorMessage.non_field_errors) {
            alert(errorMessage.non_field_errors);
        } else {
            alert("Authentication failed, check your credentials and make sure your APP is up to date.");
        }
    }
}
