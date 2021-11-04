class GitHubSDK {
    constructor(username, token) {
        if(!username) {
            throw new Error('No username specified!');
        }
        if(!token) {
            throw new Error('No token specified!');
        }
    }
}

export default GitHubSDK;