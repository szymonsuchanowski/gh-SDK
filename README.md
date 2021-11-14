// Readme - draft to improve //

 # Brief information on how to start the project

 ## Installation and configuration

*   download repository
*   use -> npm i command
*   in root directory create .env file with code as below - enter your details:

```
USERNAME='put-your-username-here'
TOKEN='put-your-personal-token-here'
```

*   creating personal token: [visit this link](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
*   run the tests with: npm run test-watch
*   run development mode with: npm run start
*   GitHubSDK will automatically verify the correctness of the entered data and inform about any errors
*   by default, the GitHubSDK will show your public repositories
*   to see someone else's public repositories, assign username as a string to the specifiedUser.username in specifiedUser.js - in specifiedUser.js enter username you want, for example:
    * in specifiedUser.js:
```
const specifiedUser = {
    username: 'username-as-string'
}
```
