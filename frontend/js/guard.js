// frontend/js/guard.js
window.checkAuth = function() {
    const token = localStorage.getItem('token');
    const exp = localStorage.getItem('exp');

    if (!token || !exp) {
        return false;
    }

    if (Date.now() > parseInt(exp)) {
        localStorage.clear();
        return false;
    }

    return true;
};
