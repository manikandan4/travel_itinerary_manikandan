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
            // Production - use same domain, nginx will proxy /auth to backend
            return `${protocol}//${hostname}`;
        }
    }

    init() {
        this.bindEvents();
        this.handleUrlErrors();
    }

    bindEvents() {
        const googleSigninBtn = document.getElementById('googleSigninBtn');
        if (googleSigninBtn) {
            googleSigninBtn.addEventListener('click', this.handleGoogleSignin.bind(this));
        }
    }

    handleUrlErrors() {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');

        if (error === 'unauthorized') {
            this.showAuthStatus('error', 'Sorry, your email is not authorized for family access. Please contact a family member.');
            // Clean the URL
            window.history.replaceState({}, document.title, window.location.pathname);
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
