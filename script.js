// ============================================================
// SCRIPT.JS - Shared Functions
// ============================================================

// ============================================================
// API URL - UPDATE THIS
// ============================================================

var API_URL = "https://script.google.com/macros/s/AKfycbwlcUEZ9hWV1TPF2Fv5a1k8pJUqZ8cZ2R5QI4lAhogADGHVzsOsgvv3TEmQkSHFJkx1/exec";
// ============================================================
// AUTH
// ============================================================

function checkAuth() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function getCurrentUser() {
    return {
        userId: localStorage.getItem('userId') || '',
        username: localStorage.getItem('username'),
        fullName: localStorage.getItem('fullName') || localStorage.getItem('username') || 'User',
        firstName: localStorage.getItem('firstName') || '',
        lastName: localStorage.getItem('lastName') || '',
        email: localStorage.getItem('email') || '',
        department: localStorage.getItem('department') || '',
        created: localStorage.getItem('created') || '',
        isAdmin: localStorage.getItem('username') === 'admin'
    };
}

function logout() {
    var userId = localStorage.getItem('userId');

    if (userId) {
        fetch(API_URL +
            '?action=logout' +
            '&userId=' + encodeURIComponent(userId))
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log('Logout logged:', result);
        })
        .catch(function(error) {
            console.error('Logout log error:', error);
        });
    }

    localStorage.clear();
    window.location.href = 'index.html';
}

// ============================================================
// ALERT
// ============================================================

function showAlert(message, type) {
    var alert = document.getElementById('alert');
    if (!alert) return;

    alert.textContent = message;
    alert.className = 'alert alert-' + type + ' show';

    clearTimeout(alert._timeout);
    alert._timeout = setTimeout(function() {
        alert.classList.remove('show');
    }, 5000);
}

// ============================================================
// ENTER KEY NAVIGATION
// ============================================================

function setupEnterNavigation(formElement, fieldIds) {
    if (!formElement) return;

    for (var i = 0; i < fieldIds.length; i++) {
        var field = document.getElementById(fieldIds[i]);
        if (!field) continue;

        field.addEventListener('keydown', (function(index) {
            return function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();

                    if (index === fieldIds.length - 1) {
                        formElement.dispatchEvent(new Event('submit'));
                        return;
                    }

                    var nextField = document.getElementById(fieldIds[index + 1]);
                    if (nextField) {
                        nextField.focus();
                    }
                }
            };
        })(i));
    }
}

// ============================================================
// SEARCH ENTER KEY
// ============================================================

function setupSearchEnter(searchBoxId, searchFunction) {
    var searchBox = document.getElementById(searchBoxId);
    if (!searchBox) return;

    searchBox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (typeof searchFunction === 'function') {
                searchFunction();
            }
        }
    });
}

// ============================================================
// FORMAT DATE
// ============================================================

function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    try {
        var d = new Date(dateString);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return dateString;
    }
}

// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ============================================================
// LOADING INDICATOR
// ============================================================

function showLoading(message) {
    var overlay = document.getElementById('loadingOverlay');
    if (!overlay) {
        // Create loading overlay if it doesn't exist
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div style="display:flex;align-items:center;background:#fff;padding:20px 30px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
                <div class="loading-spinner"></div>
                <span class="loading-text" id="loadingText">Loading...</span>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    
    var text = document.getElementById('loadingText');
    if (text) text.textContent = message || 'Loading...';
    overlay.classList.add('show');
}

function hideLoading() {
    var overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

// ============================================================
// LOADING INDICATOR
// ============================================================

function showLoading(message) {
    var overlay = document.getElementById('loadingOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div style="display:flex;align-items:center;background:#fff;padding:20px 30px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
                <div class="loading-spinner"></div>
                <span class="loading-text" id="loadingText">Loading...</span>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    var text = document.getElementById('loadingText');
    if (text) text.textContent = message || 'Loading...';
    overlay.classList.add('show');
}

function hideLoading() {
    var overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}
