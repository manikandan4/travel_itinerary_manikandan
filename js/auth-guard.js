// Authentication middleware for protecting pages
class AuthGuard {
    constructor() {
        // Detect the current environment and set backend URL accordingly
        this.backendUrl = this.detectBackendUrl();
        this.token = null;
        this.init();
    }

    detectBackendUrl() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            // Local development - backend runs on port 3001
            return `${protocol}//localhost:3001`;
        } else {
            // Production - same domain as frontend
            return `${protocol}//${hostname}`;
        }
    }

    init() {
        this.handleTokenFromUrl();
        this.checkAuthentication();
        this.addLogoutFunctionality();
    }

    handleTokenFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('jwt_token', token);
            // Clean the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    getToken() {
        if (!this.token) {
            this.token = localStorage.getItem('jwt_token');
        }
        return this.token;
    }

    async checkAuthentication() {
        const token = this.getToken();

        if (!token) {
            this.redirectToLogin();
            return;
        }

        try {
            const response = await fetch(`${this.backendUrl}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                // Token is invalid or expired
                this.logout(); // Clear token and redirect
                return;
            }

            const data = await response.json();

            if (!data.authenticated) {
                this.logout();
                return;
            }

            // User is authenticated, add user info to page if needed
            this.addUserInfo(data.user);
            this.addLogoutButton();

        } catch (error) {
            console.error('Auth check error:', error);
            this.redirectToLogin();
        }
    }

    redirectToLogin() {
        // Avoid redirect loops on the login page itself
        if (!window.location.pathname.endsWith('login.html')) {
            window.location.href = '/login.html';
        }
    }

    logout() {
        localStorage.removeItem('jwt_token');
        this.token = null;
        // Optional: Call a backend logout endpoint if it exists to blacklist token
        // fetch(`${this.backendUrl}/auth/logout`, { method: 'POST' });
        this.redirectToLogin();
    }

    addLogoutFunctionality() {
        // Event delegation for logout link
        document.addEventListener('click', (event) => {
            // Find the closest ancestor which is a link inside a .logout-link element
            const logoutLink = event.target.closest('.logout-link a');
            if (logoutLink || event.target.closest('.logout-link')) {
                event.preventDefault();
                this.logout();
            }
        });
    }

    addUserInfo(user) {
        // Add a small user indicator in the navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer && !document.querySelector('.user-info')) {
            const userInfo = document.createElement('div');
            userInfo.className = 'user-info';
            userInfo.innerHTML = `
                <div class="user-avatar">
                    ${user.photo ? 
                        `<img src="${user.photo}" alt="${user.name}" class="user-photo">` : 
                        `<i class="fas fa-user"></i>`
                    }
                </div>
                <span class="user-name">Hi, ${user.name.split(' ')[0]}!</span>
            `;
            navContainer.appendChild(userInfo);
        }
    }

    addLogoutButton() {
        // Add logout button to navigation
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && !document.querySelector('.logout-link')) {
            const logoutItem = document.createElement('li');
            logoutItem.className = 'logout-link';
            logoutItem.innerHTML = `<a href="#">Logout</a>`;
            navLinks.appendChild(logoutItem);
        }
    }
}

// Initialize the guard on all protected pages
// The login page will have its own logic and won't include this script.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AuthGuard());
} else {
    new AuthGuard();
}
