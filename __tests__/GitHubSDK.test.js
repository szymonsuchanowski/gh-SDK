import nodeFetch from 'node-fetch';
global.fetch = nodeFetch;
import GitHubSDK from '../src/js/GitHubSDK';
import user from '../src/js/user.config';

describe('GitHubSDK class', () => {
    describe('Create instance', () => {
        it('Should throw exception when username is not specified', () => {
            function createGhSdk() {
                new GitHubSDK(undefined, 'xxxx');
            };
            expect(createGhSdk).toThrow();
        });

        it('Should throw exception when token is not specified', () => {
            function createGhSdk() {
                new GitHubSDK('xxxxx');
            };
            expect(createGhSdk).toThrow();
        });

        it('Should throw exception when token & username are not specified', () => {
            function createGhSdk() {
                new GitHubSDK();
            };
            expect(createGhSdk).toThrow();
        });

        it('Should set username & token when create instance', () => {
            const username = 'xxxxx';
            const token = '12345678';
            const ghSdk = new GitHubSDK(username, token);
            expect(ghSdk.getUsername()).toBe(username);
            expect(ghSdk.getToken()).toBe(token);
        });
    });

    describe('validateUser()', () => {
        it('Should throw exception when token is incorrect', async () => {
            const username = 'szymonsuchanowski';
            const token = 'invalidtoken';
            const ghSdk = new GitHubSDK(username, token);
            await expect(ghSdk.validateUser()).rejects.toThrow('Unauthorized');
        });

        it('Should throw exception when token is correct but not connected with specifiedd username', async () => {
            const username = 'usernamenotconnectedwithtoken';
            const token = user.token;
            const ghSdk = new GitHubSDK(username, token);
            await expect(ghSdk.validateUser()).rejects.toThrow('Token is not connected with specified username!');
        });

        it('Should return user login when token is correct & connected with specified username', async () => {
            const username = user.username;
            const token = user.token;
            const ghSdk = new GitHubSDK(username, token);
            const { login } = await ghSdk.validateUser();
            expect(login).toBe(user.username);
            //await expect(ghSdk.validateUser()).resolves.toBe(200);
        });
    });

    describe('getUserInfo(username)', () => {
        it('Should throw exception when username is not specified', async () => {
            const ghSdk = new GitHubSDK(user.username, user.token);
            await expect(ghSdk.getUserInfo()).rejects.toThrow('No username specified!');
        });

        it('Should throw exception when specified username is incorrect', async () => {
            const ghSdk = new GitHubSDK(user.username, user.token);
            await expect(ghSdk.getUserInfo('///user--do-not-exist////')).rejects.toThrow('Not Found');
        });

        it('Should return user login when correct username is specified', async () => {
            const ghSdk = new GitHubSDK(user.username, user.token);
            const { login } = await ghSdk.getUserInfo('szymonsuchanowski');
            expect(login).toBe('szymonsuchanowski');
        });
    });

    describe('getUserRepos(username)', () => {
        it('Should throw exception when username is not specified', async () => {
            const ghSdk = new GitHubSDK(user.username, user.token);
            await expect(ghSdk.getUserRepos()).rejects.toThrow('No username specified!');
        });

        it('Should throw exception when specified username is incorrect', async () => {
            const ghSdk = new GitHubSDK(user.username, user.token);
            await expect(ghSdk.getUserRepos('///use---r--do-not-exist////')).rejects.toThrow('Not Found');
        });

        it('Should return repos list when username is correct', async () => {
            const ghSdk = new GitHubSDK(user.username, user.token);
            const result = await ghSdk.getUserRepos('szymonsuchanowski');
            expect(Array.isArray(result)).toBeTruthy();
        })
    });
})


