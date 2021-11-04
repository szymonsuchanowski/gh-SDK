import user from "./user.config";

class GitHubSDK {
    constructor(usernameValue = null, tokenValue = null) {
        this._setProperty('username', usernameValue);
        this._setProperty('token', tokenValue);
    }

    getUsername() {
        return this.username;
    }

    getToken() {
        return this.token;
    }

    async validateUser() {
        const promise = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `token ${this.token}`,
            },
        });
        if (promise.ok) {
            const response = await promise.json();
            if (response.login === this.username) {
                return promise.status;
            }
            throw new Error('Token is not connected with specified username!');
        } else if (promise.status === 401) {
            throw new Error('Unauthorized token!');
        }
        throw new Error(promise.status);
    }

    _setProperty(propertyName, propertyValue) {
        if (!propertyValue) {
            throw new Error(`No ${propertyName} specified!`);
        }
        this[propertyName] = propertyValue;
    }
}

export default GitHubSDK;