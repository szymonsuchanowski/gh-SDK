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

    _setProperty(propertyName, propertyValue) {
        if(!propertyValue) {
            throw new Error(`No ${propertyName} specified!`);
        }
        this[propertyName] = propertyValue;
    }
}

export default GitHubSDK;