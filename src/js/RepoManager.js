class RepoManager {
    constructor(ghSDK) {
        this.ghSDK = ghSDK;
        this.projectEl = document.querySelector('.project--prototype');
        this.projectsListEl = document.querySelector('.projects__list');
    }

    async renderRepos() {
        const isUserValid = await this._isUserValid();
        if (!isUserValid) {
            return this._showInfoMsg();
        }
        const username = this.ghSDK.getUsername();
        const repos = await this.ghSDK.getUserPublicRepos(username);
        return repos.length > 0 ? this._insertRepos(repos) : this._showInfoMsg();
    }

    async _isUserValid() {
        const { login } = await this.ghSDK.validateUser();
        return login === process.env.USERNAME;
    }

    _showInfoMsg() {

    }

    _insertRepos(reposList) {
        if(reposList.length === 1) {
            this._changeLayout();
        }
        reposList.forEach(repo => {
            const liEl = this._createLiEl(repo);
            this.projectsListEl.appendChild(liEl);
        })
    }

    _changeLayout() {
        this.projectsListEl.classList.add('projects__list--1col');
    }

    _createLiEl(repo) {
        const { name, description, homepage, html_url: url } = repo;
        const newLiEl = this._getLiProto();
        this._setLiTextContent(newLiEl, 'project__description--title', name);
        this._setLiTextContent(newLiEl, 'project__description--subtitle', description);
        this._setLiDemoLink(newLiEl, 'project__link--demo', homepage, name);
        this._setLinkAttr(newLiEl,'project__link--gh', url, name, 'code');
        return newLiEl;
    }

    _getLiProto() {
        const liEl = this.projectEl.cloneNode(true);
        liEl.classList.remove('project--prototype');
        return liEl;
    }

    _setLiTextContent(liEl, className, textContent) {
        if (!textContent) {
            textContent = 'Not yet completed - work in progress...';
        }
        liEl.querySelector(`.${className}`).innerText = textContent;
    }

    _setLiDemoLink(liEl, className, link, repoTitle) {
        if(!link) {
            const textContent = 'No demo yet, work in progress...';
            return this._setLiTextContent(liEl, 'project__description--demo', textContent);
        }
        this._setLinkAttr(liEl, className, link, repoTitle, 'demo');
    }

    _setLinkAttr(liEl, className, link, repoTitle, attrTitle) {
        const aEl = liEl.querySelector(`.${className}`);
        aEl.setAttribute('href', link);
        aEl.setAttribute('title', `${repoTitle} - ${attrTitle}`);
    }
}

export default RepoManager;