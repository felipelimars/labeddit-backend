"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getUsername() {
        return this.username;
    }
    setUsername(value) {
        this.username = value;
    }
    getEmail() {
        return this.email;
    }
    setEmail(value) {
        this.email = value;
    }
    getPassword() {
        return this.password;
    }
    setPassword(value) {
        this.password = value;
    }
    toUserDB() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password
        };
    }
    toUserModel() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password
        };
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map