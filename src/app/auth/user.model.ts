export class User {
    constructor (
        public email: string,
        private _token: string
    ) {}

    get isAuth() {
        return !!this.token;
    }

    get token() {
        if (!this._token) {
            return null
        }
        return this._token;
    }

    get userEmail() {
        if (!this.email) {
            return null;
        }
        return this.email;
    }
}
