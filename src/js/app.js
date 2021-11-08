import './../css/main.css';
import GitHubSDK from './GitHubSDK';
import user from './user.config';
document.addEventListener('DOMContentLoaded', init);

function init() {
    const gh = new GitHubSDK(user.username, user.token);
    gh.getUserFollowers('szymonsuchanowski')
        .then(data => console.log(data));
    gh.getUserFollowing('szymonsuchanowski')
        .then(data => console.log(data));
    gh.getUserRepos('devmentor-pl')
        .then(data => console.log(data));
    gh.getRepoReadme('devmentor-pl', 'practice-js-basics')
        .then(data => console.log(data));
}

