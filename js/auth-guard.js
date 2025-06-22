// Authentication middleware for protecting pages
class AuthGuard {
    constructor() {
        // Detect the current environment and set backend URL accordingly
        this.backendUrl = this.detectBackendUrl();
        this.checkingAuth = false;
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
        this.checkAuthentication();
        this.addLogoutFunctionality();
    }

    async checkAuthentication() {
        if (this.checkingAuth) return;
        this.checkingAuth = true;

        const urlParams = new URLSearchParams(window.location.search);
        const isPostLogin = urlParams.has('auth');

        // If this is the first load after a login attempt, give it a moment
        if (isPostLogin) {
            // Clean the URL
            window.history.replaceState({}, document.title, window.location.pathname);
            // Wait a fraction of a second for the session cookie to be processed
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        try {
            const response = await fetch(`${this.backendUrl}/auth/status`, {
                credentials: 'include',
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error('Authentication check failed');
            }

            const data = await response.json();

            if (!data.authenticated) {
                this.redirectToLogin();
                return;
            }

            // User is authenticated, add user info to page if needed
            this.addUserInfo(data.user);
            this.addLogoutButton();

        } catch (error) {
            console.error('Auth check error:', error);
            // If we can't reach the auth server, redirect to login
            this.redirectToLogin();
        } finally {
            this.checkingAuth = false;
        }
    }

    redirectToLogin() {
        window.location.href = '/login.html';
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
            logoutItem.innerHTML = `
                <a href="#" class="nav-link logout-link" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i> Sign Out
                </a>
            `;
            navLinks.appendChild(logoutItem);
        }
    }

    addLogoutFunctionality() {
        document.addEventListener('click', async (event) => {
            if (event.target.closest('#logoutBtn')) {
                event.preventDefault();
                await this.handleLogout();
            }
        });
    }

    async handleLogout() {
        try {
            const response = await fetch(`${this.backendUrl}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors'
            });

            if (response.ok) {
                // Clear any local storage/session storage if used
                localStorage.clear();
                sessionStorage.clear();
                
                // Redirect to login page
                window.location.href = '/login.html';
            } else {
                console.error('Logout failed');
                // Force redirect anyway
                window.location.href = '/login.html';
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Force redirect anyway
            window.location.href = '/login.html';
        }
    }

    // Method for pages to verify access before loading content
    async verifyAccess() {
        try {
            const response = await fetch(`${this.backendUrl}/api/verify-access`, {
                credentials: 'include',
                mode: 'cors'
            });

            if (!response.ok) {
                this.redirectToLogin();
                return false;
            }

            return true;
        } catch (error) {
            console.error('Access verification error:', error);
            this.redirectToLogin();
            return false;
        }
    }
}

// Initialize auth guard on protected pages
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on non-login pages
    if (!window.location.pathname.includes('login.html')) {
        const authGuard = new AuthGuard();
        window.authGuard = authGuard;
    }
});

// CSS for user info in navigation
const userInfoStyles = `
<style>
.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    background: rgba(243, 156, 18, 0.1);
    border-radius: 20px;
    border: 1px solid rgba(243, 156, 18, 0.3);
    font-size: 0.9rem;
    color: var(--primary-color);
}

.user-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-color);
    color: white;
}

.user-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-name {
    font-weight: 600;
    white-space: nowrap;
}

/* Auth controls styling */
.auth-controls {
    margin-left: auto;
}

.auth-buttons {
    display: flex;
    gap: 10px;
    align-items: center;
}

.auth-buttons .nav-link {
    padding: 8px 12px !important;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
}

.auth-buttons .nav-link:hover {
    background: var(--primary-color);
    color: white !important;
    transform: scale(1.1);
}

.logout-link {
    color: var(--secondary-color) !important;
}

#switchAccountBtn {
    color: var(--accent-color) !important;
}

@media (max-width: 768px) {
    .user-info {
        padding: 6px 12px;
        font-size: 0.8rem;
    }
    
    .user-name {
        display: none;
    }
    
    .auth-buttons .nav-link {
        width: 35px;
        height: 35px;
        padding: 6px !important;
    }
}
</style>
`;

// Inject user info styles
document.head.insertAdjacentHTML('beforeend', userInfoStyles);
