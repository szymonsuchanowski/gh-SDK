import user from "./user.config";

class GitHubSDK {
    constructor(usernameValue = null, tokenValue = null) {
        this._setProperty('username', usernameValue);
        this._setProperty('token', tokenValue);
        this.url = 'https://api.github.com/';
    }

    getUsername() {
        return this.username;
    }

    getToken() {
        return this.token;
    }

    async validateUser() {
        const promise = await this._fetch('user', this._options());
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

    async _fetch(additionalPath, options) {
        return await fetch(this.url + additionalPath, options);
    }

    _options() {
        return {
            headers: {
                Authorization: `token ${this.token}`,
            },
        }
    }
}

export default GitHubSDK;