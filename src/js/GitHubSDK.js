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
        const response = await this._fetch('user', this._options());
        if (response.login === this.username) {
            return response;
        } else {
            throw new Error('Token is not connected with specified username!');
        }
    }

    async getUserInfo(username) {
        if (!username) {
            throw new Error('No username specified!');
        }
        return await this._fetch(`users/${username}`, this._options());
    }

    async getUserPublicRepos(username) {
        if (!username) {
            throw new Error('No username specified!');
        }
        return await this._fetch(`users/${username}/repos`, this._options());
    }

    async getRepoCommits(username, repoName) {
        if (!username || !repoName) {
            throw new Error('No username or repo name specified!');
        }
        return await this._fetch(`repos/${username}/${repoName}/commits`, this._options());
    }

    async getRepoReadme(username, repoName) {
        if (!username || !repoName) {
            throw new Error('No username or repo name specified!');
        }
        return await this._fetch(`repos/${username}/${repoName}/readme`, this._options());
    }

    async getUserFollowers(username) {
        if (!username) {
            throw new Error('No username specified!');
        }
        return await this._fetch(`users/${username}/followers`, this._options());
    }

    async getUserFollowing(username) {
        if (!username) {
            throw new Error('No username specified!');
        }
        return await this._fetch(`users/${username}/following`, this._options());
    }

    async getRepoEvents(username, repoName) {
        if (!username || !repoName) {
            throw new Error('No username or repo name specified!');
        }
        return await this._fetch(`repos/${username}/${repoName}/events`, this._options());
    }

    async createRepo(repoName) {
        if (!repoName) {
            throw new Error('No repo name specified!');
        }
        const additionalOptions = {
            body: JSON.stringify({
                name: repoName
            })
        };
        return await this._fetch(`user/repos`, this._options('POST', additionalOptions));
    }

    async deleteRepo(repoName) {
        if (!repoName) {
            throw new Error('No repo name specified!');
        }
        return await this._fetch(`repos/${this.username}/${repoName}`, this._options('DELETE'));
    }

    async sendInvitation(invitedUser, repoName) {
        if (!invitedUser || !repoName) {
            throw new Error('No username or repo name specified!');
        }
        const additionalOptions = {
            credentials: 'same-origin',
            redirect: 'follow',
            body: JSON.stringify({
                permission: 'pull'
            })
        };
        return await this._fetch(`repos/${this.username}/${repoName}/collaborators/${invitedUser}`, this._options('PUT', additionalOptions));
    }

    async getInvitationsList(repoName) {
        if (!repoName) {
            throw new Error('No repo name specified!');
        }
        return await this._fetch(`repos/${this.username}/${repoName}/invitations`, this._options());
    }

    async removeInvitation(username, repoName) {
        if (!username || !repoName) {
            throw new Error('No username or repo name specified!');
        }
        const invitationsList = await this.getInvitationsList(repoName);
        const invitationId = this._getInvitationId(invitationsList, username);
        if (!invitationId) {
            throw new Error('Specified user was not invited!');
        }
        return await this._fetch(`repos/${this.username}/${repoName}/invitations/${invitationId}`, this._options('DELETE'));
    }

    async _fetch(additionalPath, options) {
        const promise = await fetch(this.url + additionalPath, options);
        if (promise.ok) {
            if (promise.status === 204) {
                return promise;
            }
            return await promise.json();
        }
        throw new Error(promise.statusText);
    }

    _options(methodName = 'GET', additionalOptions = null) {
        const defaultOptions = {
            method: methodName,
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `token ${this.token}`,
            },
        };
        return { ...defaultOptions, ...additionalOptions };
    }

    _setProperty(propertyName, propertyValue) {
        if (!propertyValue) {
            throw new Error(`No ${propertyName} specified!`);
        }
        this[propertyName] = propertyValue;
    }

    _getInvitationId(invitationsList, username) {
        const invitation = invitationsList.find(invitation => invitation.invitee.login === username);
        return invitation ? invitation.id : null;
    }
}

export default GitHubSDK;