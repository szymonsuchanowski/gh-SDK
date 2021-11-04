class GitHubSDK {
    constructor(username) {
        if(!username) {
            throw new Error('No username specified!');
        }
    }
}

export default GitHubSDK;