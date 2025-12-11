// frontend/js/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    async function handleLoginSubmit(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const data = await postData(`${API_URL}/auth/login`, { email, password });
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);
            localStorage.setItem('exp', Date.now() + 15 * 60 * 1000);
            
            showMessage('message', `Success! Logged in as ${data.user.role}. Redirecting...`, false);
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);

        } catch (error) {
            showMessage('message', `Login failed: ${error.message}`, true);
        }
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }

    async function handleRegisterSubmit(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const roleElem = document.getElementById('role');
        const role = roleElem ? roleElem.value : 'user';

        try {
            const data = await postData(`${API_URL}/auth/register`, { email, password, role });
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);
            localStorage.setItem('exp', Date.now() + 15 * 60 * 1000);
            
            showMessage('message', 'Registration successful! Logged in and redirecting...', false);

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);

        } catch (error) {
            showMessage('message', `Registration failed: ${error.message}`, true);
        }
    }
});
