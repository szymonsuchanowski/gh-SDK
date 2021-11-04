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
    })
})


