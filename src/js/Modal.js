class Modal {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.modalContent = document.querySelector('.modal__content');
    }

    show(infoType, errMsg = null) {
        const modalContentEl = this._createContent(infoType, errMsg);
        this.modalContent.appendChild(modalContentEl);
        this._open();
    }

    _createContent(infoType, errMsg) {
        const msg = this._message()[infoType];
        return this._createNewPEl(msg, errMsg);
    }

    _message() {
        return {
            repos: 'Oops, no repositories. Keep working! Create your first repository and again use the GitHub SDK - GH Projects. Good luck!',
            error: 'Oops, error! Check the entered data and refresh the page.'
        }
    }

    _createNewPEl(msg, errMsg) {
        const newP = document.createElement('p');
        if (errMsg) {
            msg = `${msg} (Error message: ${errMsg})`;
        }
        newP.textContent = msg;
        return newP;
    }

    _open() {
        this.modal.classList.add('modal--active');
        this.modalContent.classList.add('modal__content--active');
        document.body.style.overflow = 'hidden';
    }
}

export default Modal;