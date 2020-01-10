import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable({providedIn: "root"})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: RouterExtensions) {}

    login(email: string, password: string) {
        console.log("Email:", email, "Password:", password)
    }
}
