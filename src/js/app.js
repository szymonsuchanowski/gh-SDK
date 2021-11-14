import './../css/main.css';
import GitHubSDK from './GitHubSDK';
import RepoManager from './RepoManager';
import Modal from './Modal';
import { specifiedUser } from './specifiedUser';

document.addEventListener('DOMContentLoaded', init);

async function init() {
    const username = process.env.USERNAME;
    const token = process.env.TOKEN;
    try {
        await handleRender(username, token, specifiedUser.username);
    } catch (err) {
        handleError(err);
    }
}

async function handleRender(username, token, specifiedUser) {
    const gh = new GitHubSDK(username, token);
    const modal = new Modal();
    const repoManager = new RepoManager(gh, modal);
    await repoManager.renderRepos(specifiedUser);
}

function handleError(err) {
    console.error(err);
    const modal = new Modal();
    modal.show('error', err.message);
}
