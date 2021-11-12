import './../css/main.css';
import GitHubSDK from './GitHubSDK';
import RepoManager from './RepoManager';
document.addEventListener('DOMContentLoaded', init);

async function init() {
    const username = process.env.USERNAME;
    const token = process.env.TOKEN;
    const gh = new GitHubSDK(username, token);
    const repoManager = new RepoManager(gh);
    repoManager.renderRepos();
}

