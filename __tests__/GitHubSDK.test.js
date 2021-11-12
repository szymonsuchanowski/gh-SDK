import nodeFetch from 'node-fetch';
global.fetch = nodeFetch;
import GitHubSDK from '../src/js/GitHubSDK';
require('dotenv').config();

const username = process.env.USERNAME;
const token = process.env.TOKEN;

describe('GitHubSDK class', () => {
    describe('Create instance', () => {
        it('Should throw exception when username is not specified', () => {
            function createGhSDK() {
                new GitHubSDK(undefined, 'xxxx');
            };
            expect(createGhSDK).toThrow('No username specified!');
        });

        it('Should throw exception when token is not specified', () => {
            function createGhSDK() {
                new GitHubSDK('xxxxx');
            };
            expect(createGhSDK).toThrow('No token specified!');
        });

        it('Should throw exception when token & username are not specified', () => {
            function createGhSDK() {
                new GitHubSDK();
            };
            expect(createGhSDK).toThrow();
        });

        it('Should set username & token when create instance', () => {
            const usernameTest = 'xxxxx';
            const tokenTest = '12345678';
            const ghSDK = new GitHubSDK(usernameTest, tokenTest);
            expect(ghSDK.getUsername()).toBe(usernameTest);
            expect(ghSDK.getToken()).toBe(tokenTest);
        });
    });

    describe('validateUser()', () => {
        it('Should throw exception when token is incorrect', async () => {
            const usernameTest = 'szymonsuchanowski';
            const tokenTest = 'invalidtoken';
            const ghSDK = new GitHubSDK(usernameTest, tokenTest);
            await expect(ghSDK.validateUser()).rejects.toThrow('Unauthorized');
        });

        it('Should throw exception when token is correct but not connected with specifiedd username', async () => {
            const usernameTest = 'usernamenotconnectedwithtoken';
            const tokenTest = token;
            const ghSDK = new GitHubSDK(usernameTest, tokenTest);
            await expect(ghSDK.validateUser()).rejects.toThrow('Token is not connected with specified username!');
        });

        it('Should return user login when token is correct & connected with specified username', async () => {
            const usernameTest = username;
            const tokenTest = token;
            const ghSDK = new GitHubSDK(usernameTest, tokenTest);
            const { login } = await ghSDK.validateUser();
            expect(login).toBe(username);
        });
    });

    describe('getUserInfo(username)', () => {
        it('Should throw exception when username is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getUserInfo()).rejects.toThrow('No username specified!');
        });

        it('Should throw exception when specified username is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getUserInfo('///user--do-not-exist/----//----/')).rejects.toThrow('Not Found');
        });

        it('Should return user login when correct username is specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const { login } = await ghSDK.getUserInfo('szymonsuchanowski');
            expect(login).toBe('szymonsuchanowski');
        });
    });

    describe('getUserPublicRepos(username)', () => {
        it('Should throw exception when username is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getUserPublicRepos()).rejects.toThrow('No username specified!');
        });

        it('Should throw exception when specified username is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getUserPublicRepos('///use---r--do-not-exist//-------//')).rejects.toThrow('Not Found');
        });

        it('Should return repos list when username is correct', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const result = await ghSDK.getUserPublicRepos('szymonsuchanowski');
            expect(Array.isArray(result)).toBeTruthy();
        });
    });

    describe('getRepoCommits(username, repoName)', () => {
        it('Should throw exception when username & repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoCommits()).rejects.toThrow('No username or repo name specified!');
        })

        it('Should throw exception when username is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoCommits(undefined, 'practice-js-testing')).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoCommits('szymonsuchanowski')).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when specified username is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoCommits('///use---r--does-not-exist////', 'xxx')).rejects.toThrow('Not Found');
        });

        it('Should throw exception when specified repo name is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoCommits('szymonsuchanowski', '--repo-does-not-exist--')).rejects.toThrow('Not Found');
        });

        it('Should return commits list when username & repo name are correct', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const result = await ghSDK.getRepoCommits('szymonsuchanowski', 'practice-js-basics');
            expect(Array.isArray(result)).toBeTruthy();
        });
    });

    describe('getRepoReadme(username, repoName)', () => {
        it('Should throw exception when username & repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoReadme()).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when username is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoReadme(undefined, 'practice-js-testing')).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoReadme('szymonsuchanowski')).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when specified username is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoReadme('///use---r--does-not-exist////', 'xxx')).rejects.toThrow('Not Found');
        });

        it('Should throw exception when specified repo name is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoReadme('szymonsuchanowski', '--repo-does-not-exist--')).rejects.toThrow('Not Found');
        });

        it('Should return readme info when username & repo name are correct', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const result = await ghSDK.getRepoReadme('szymonsuchanowski', 'practice-js-basics');
            expect(result.name).toBe('README.md');
        });
    });

    describe('getUserFollowers(username)', () => {
        it('Should throw exception when username is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getUserFollowers()).rejects.toThrow('No username specified!');
        });

        it('Should throw exception when username is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getUserFollowers('----user--does-not---exist//')).rejects.toThrow('Not Found');
        });

        it('Should return followers list when username is correct', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const result = await ghSDK.getUserFollowers('szymonsuchanowski');
            expect(Array.isArray(result)).toBeTruthy();
        });
    });

    describe('getUserFollowing(username)', () => {
        it('Should throw exception when username is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getUserFollowing()).rejects.toThrow('No username specified!');
        });

        it('Should throw exception when username is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getUserFollowing('----user--does-not---exist//')).rejects.toThrow('Not Found');
        });

        it('Should return list of following users when username is correct', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const result = await ghSDK.getUserFollowing('szymonsuchanowski');
            expect(Array.isArray(result)).toBeTruthy();
        });
    });

    describe('getRepoEvents(username, repoName)', () => {
        it('Should throw exception when username & repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoEvents()).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when username is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoEvents(undefined, 'practice-js-testing')).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoEvents('szymonsuchanowski')).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when specified username is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoEvents('///use---r--does-not-exist////', 'xxx')).rejects.toThrow('Not Found');
        });

        it('Should throw exception when specified repo name is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.getRepoEvents('szymonsuchanowski', '--repo-does-not-exist--')).rejects.toThrow('Not Found');
        });

        it('Should return repo events when username & repo name are correct', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const result = await ghSDK.getRepoEvents('szymonsuchanowski', 'practice-js-basics');
            expect(Array.isArray(result)).toBeTruthy();
        });
    });

    describe('createRepo(repoName)', () => {
        it('Should throw exception when repoName is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.createRepo()).rejects.toThrow('No repo name specified!');
        });
    });

    describe('deleteRepo(repoName)', () => {
        it('Should throw exception when repoName is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.deleteRepo()).rejects.toThrow('No repo name specified!');
        });

        it('Should throw exception when specified repoName does not exist', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.deleteRepo('-----repo---does-not-exist---/////')).rejects.toThrow('Not Found');
        });
    })

    describe('sendInvitation(invitedUser, repoName', () => {
        it('Should throw exception when invitedUser & repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.sendInvitation()).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when invitedUser is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.sendInvitation(undefined, 'practice-js-testing')).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.sendInvitation('szymonsuchanowski')).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when specified invitedUser is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.sendInvitation('///use---r--does-not-exist////', 'xxx')).rejects.toThrow('Not Found');
        });

        it('Should throw exception when specified repo name is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.sendInvitation('szymonsuchanowski-test', '----repo--does---not-exi///st/////----')).rejects.toThrow('Not Found');
        });
    });

    describe('getInvitationsList(repoName)', () => {
        it('Should throw exception when repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            expect(ghSDK.getInvitationsList()).rejects.toThrow('No repo name specified!');
        });

        it('Should throw exception when specified repo name does not exist', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const repoName = '----repo--does-not----exis/////t---';
            expect(ghSDK.getInvitationsList(repoName)).rejects.toThrow('Not Found');
        });
    });

    describe('removeInvitation(username, repoName)', () => {
        it('Should throw exception when username & repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.removeInvitation()).rejects.toThrow('No username or repo name specified!');
        })

        it('Should throw exception when username is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.removeInvitation(undefined, 'practice-js-testing')).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when repo name is not specified', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.removeInvitation('szymonsuchanowski-test')).rejects.toThrow('No username or repo name specified!');
        });

        it('Should throw exception when specified repo name is incorrect', async () => {
            const ghSDK = new GitHubSDK(username, token);
            await expect(ghSDK.removeInvitation('szymonsuchanowski-test', '---repo--does-not-exi///st----')).rejects.toThrow('Not Found');
        });
    });

    describe('flow: create test repo -> try to create the same test repo -> send invitation for user to created test repo -> trying remove invitation for not invited user -> remove invitation for invited user -> delete created test repo', () => {
        it('Should create test repo', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const repoTestName = '--new-test-repo--';
            const reposBeforeCreating = await ghSDK.getUserPublicRepos(username);
            const reposNoBeforeCreating = reposBeforeCreating.length;
            await ghSDK.createRepo(repoTestName);
            const reposAfterCreating = await ghSDK.getUserPublicRepos(username);
            const reposNoAfterCreating = reposAfterCreating.length;
            expect(reposNoAfterCreating).toBe(reposNoBeforeCreating + 1);
        });

        it('Should throw exception when trying to create repo with the same name', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const repoTestName = '--new-test-repo--';
            await expect(ghSDK.createRepo(repoTestName)).rejects.toThrow('Unprocessable Entity');
        });

        it('Should send invitation for test user to created repo', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const invitedUser = 'szymonsuchanowski-test';
            const repoTestName = '--new-test-repo--';
            const result = await ghSDK.sendInvitation(invitedUser, repoTestName);
            const { login } = result.invitee;
            expect(login).toBe(invitedUser);
        });

        it('Should throw exception when trying to remove invitation for not invited user', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const userNotInvited = 'szymonsuchanowski-test2';
            const repoTestName = '--new-test-repo--';
            expect(ghSDK.removeInvitation(userNotInvited, repoTestName)).rejects.toThrow('Specified user was not invited!');
        });

        it('Should remove invitation for invited user', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const invitedUser = 'szymonsuchanowski-test';
            const repoTestName = '--new-test-repo--';
            const invitationsListBeforeRemoving = await ghSDK.getInvitationsList(repoTestName);
            const invitationsNoBeforeRemoving = invitationsListBeforeRemoving.length;
            await ghSDK.removeInvitation(invitedUser, repoTestName);
            const invitationsListAfterRemoving = await ghSDK.getInvitationsList(repoTestName);
            const invitationsNoAfterRemoving = invitationsListAfterRemoving.length;
            expect(invitationsNoAfterRemoving).toBe(invitationsNoBeforeRemoving - 1);
        });

        it('Should delete created test repo', async () => {
            const ghSDK = new GitHubSDK(username, token);
            const repoTestName = '--new-test-repo--';
            const reposBeforeDeleting = await ghSDK.getUserPublicRepos(username);
            const reposNoBeforeDeleting = reposBeforeDeleting.length;
            await ghSDK.deleteRepo(repoTestName);
            const reposAfterDeleting = await ghSDK.getUserPublicRepos(username);
            const reposNoAfterDeleting = reposAfterDeleting.length;
            expect(reposNoAfterDeleting).toBe(reposNoBeforeDeleting - 1);
        });
    });
})
