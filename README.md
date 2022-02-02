![GitHub SDK screenshot](/assets/ghsdk-mockup.png "GitHub SDK screenshot")

&nbsp;

## 🔍 Overview

### What is GitHub SDK?

GitHub SDK is kind of [Software Development Kit](https://en.wikipedia.org/wiki/Software_development_kit). In short, GitHub SDK is reflection of selected user interface functions on the GitHub website using JavaScript and GitHub API.

### Main purpose of the project

The whole project is built according to [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) methodology. It is a development process in which software requirements and functionalities are firstly converted to test cases. Next step is to build an implementation that passess both software requirement and test case. After all there is a code refactoring. It is so called 'red-green-refactor' cycle.

&nbsp;

## 👨‍💻 Built with

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)

&nbsp;
## ⚙️ Run Locally and Configure

Follow the steps below to run the project locally.

- Clone the project using

```bash
  git clone
```

- Go to the project directory and install dependencies

```bash
  npm i
```

- in root directory create .env file with code as below - enter your details:

```bash
  USERNAME='put-your-username-here'
  TOKEN='put-your-personal-token-here'
```

- to create GH personal token, [click here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

- Run the tests

```bash
  npm run test-watch
```

- Start development mode

```bash
  npm start
```

- Exemplary use of GitHub SDH is ready at port 8080 (by default, the GitHubSDK will show your public repositories)

```bash
  http://localhost:8080/
```

- After starting, GitHubSDK will automatically verify the correctness of the entered data and inform about any errors
- to see another user's public repositories, assign username as a string to the `specifiedUser.username` in `specifiedUser.js` file

```javascript
const specifiedUser = {
    username: 'username-as-string'
}
```

- you can check any of the functionalities e.g. using `console.log` or using in your project (like here - GitHub SDK is used to show public repositories)

```javascript
GitHubSDK.getUserInfo('username')
    .then(data => onsole.log(data))
    .catch(err => console.error(err))
```

&nbsp;

## 🤔 Exemplary GitHub SDK functionalities

- get information about
    - user
    - user's public repositories
    - commits to repository
    - user's followers/following
- create/delete repo
- send/remove invitation

&nbsp;

## 🔗 Useful resources

- [GitHub Docs](https://docs.github.com/en/rest)

&nbsp;
## 🙏 Special thanks

Special thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) for providing me with the task and code review.
