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
        })
    })
})


