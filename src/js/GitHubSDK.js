class GitHubSDK {
    constructor(username = null, token = null) {
        this._setUsername(username);
        this._setToken(token);
        if(!token) {
            throw new Error('No token specified!');
        }
    }

    getUsername() {
        return this.username;
    }

    getToken() {
        return this.token;
    }

    _setUsername(usernameValue) {
        if(!usernameValue) {
            throw new Error('No username specified!');
        }
        this.username = usernameValue;
    }

    _setToken(tokenValue) {
        if(!tokenValue) {
            throw new Error('No token specified!');
        }
        this.token = tokenValue;
    }
}

export default GitHubSDK;