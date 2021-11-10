import './../css/main.css';
import GitHubSDK from './GitHubSDK';
import user from './user.config';
document.addEventListener('DOMContentLoaded', init);

async function init() {
    const gh = new GitHubSDK(user.username, user.token);
    /*gh.sendInvitation('szymonsuchanowski-test', 'test-repo')
        .then(data => console.log(data));*/
    /*gh.getInvitationsList('test-repo')
        .then(data => console.log(data))
        .catch(err => console.log(err));*/
}

