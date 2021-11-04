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
                new GitHubSDK('xxxxx', undefined);
            };
            expect(createGhSdk).toThrow();
        });

        it('Should throw exception when token & username is not specified', () => {
            function createGhSdk() {
                new GitHubSDK('xxxxx', undefined);
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
            await expect(ghSdk.validateUser()).rejects.toThrow('Unauthorized token!');
        });

        it('Should return status 200 when token is correct & connected with specified username', async () => {
            const username = user.username;
            const token = user.token;
            const ghSdk = new GitHubSDK(username, token);
            await expect(ghSdk.validateUser()).resolves.toBe(200);
        });

        it('Should throw exception when token is correct but not connected with specifiedd username', async () => {
            const username = 'usernamenotconnectedwithtoken';
            const token = user.token;
            const ghSdk = new GitHubSDK(username, token);
            await expect(ghSdk.validateUser()).rejects.toThrow('Token is not connected with specified username!');
        })
    })
})


