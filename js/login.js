// Login page JavaScript functionality
class LoginManager {
    constructor() {
        // Detect the current environment and set backend URL accordingly
        this.backendUrl = this.detectBackendUrl();
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
        this.bindEvents();
        this.checkAuthStatus();
        this.handleUrlParams();
    }

    bindEvents() {
        const googleSigninBtn = document.getElementById('googleSigninBtn');
        if (googleSigninBtn) {
            googleSigninBtn.addEventListener('click', this.handleGoogleSignin.bind(this));
        }
    }

    async checkAuthStatus() {
        try {
            const response = await fetch(`${this.backendUrl}/auth/status`, {
                credentials: 'include'
            });
            const data = await response.json();

            if (data.authenticated) {
                this.showAuthStatus('success', `Welcome back, ${data.user.name}! Redirecting to your family diary...`);
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 2000);
            }
        } catch (error) {
            console.log('Not authenticated or server not available');
        }
    }

    handleUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const auth = urlParams.get('auth');
        const error = urlParams.get('error');

        if (auth === 'success') {
            this.showAuthStatus('success', 'Authentication successful! Redirecting...');
            setTimeout(() => {
                // Redirect to the homepage (current domain, different port in dev)
                window.location.href = '/index.html';
            }, 2000);
        } else if (error === 'unauthorized') {
            this.showAuthStatus('error', 'Sorry, your email is not authorized for family access. Please contact a family member.');
        }
    }

    handleGoogleSignin() {
        this.showLoadingOverlay(true);
        this.showAuthStatus('loading', 'Redirecting to Google Sign-In...');
        
        // Redirect to Google OAuth
        window.location.href = `${this.backendUrl}/auth/google`;
    }

    showAuthStatus(type, message) {
        const authStatus = document.getElementById('authStatus');
        if (authStatus) {
            authStatus.className = `auth-status ${type}`;
            authStatus.innerHTML = `
                <i class="fas fa-${this.getStatusIcon(type)}"></i>
                <span>${message}</span>
            `;
        }
    }

    getStatusIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-triangle';
            case 'loading': return 'spinner fa-spin';
            default: return 'info-circle';
        }
    }

    showLoadingOverlay(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            if (show) {
                overlay.classList.add('show');
            } else {
                overlay.classList.remove('show');
            }
        }
    }

    // Method to update backend URL if needed (keeping for compatibility)
    setBackendUrl(url) {
        this.backendUrl = url;
    }
}

// Initialize login manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loginManager = new LoginManager();
    
    // Make loginManager globally available for debugging
    window.loginManager = loginManager;
});

// Handle authentication errors and provide user feedback
window.addEventListener('error', (event) => {
    console.error('Login page error:', event.error);
});

// Handle network errors gracefully
window.addEventListener('online', () => {
    console.log('Network connection restored');
});

window.addEventListener('offline', () => {
    console.log('Network connection lost');
    const loginManager = window.loginManager;
    if (loginManager) {
        loginManager.showAuthStatus('error', 'Network connection lost. Please check your internet connection.');
    }
});
