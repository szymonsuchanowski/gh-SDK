import './../css/main.css';
import GitHubSDK from './GitHubSDK';
document.addEventListener('DOMContentLoaded', init);

async function init() {
    const username = process.env.USERNAME;
    const token = process.env.TOKEN;
    const gh = new GitHubSDK(username, token);
    gh.getUserPublicRepos('szymonsuchanowski')
        .then(data => console.log(data))
}

