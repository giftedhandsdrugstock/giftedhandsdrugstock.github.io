// ============================================================
// SCRIPT.JS - Shared JavaScript for All Pages
// ============================================================

// ============================================================
// API URL
// ============================================================

const API_URL = "https://script.google.com/macros/s/AKfycbwlcUEZ9hWV1TPF2Fv5a1k8pJUqZ8cZ2R5QI4lAhogADGHVzsOsgvv3TEmQkSHFJkx1/exec";

// ============================================================
// AUTH CHECK
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
        username: localStorage.getItem('username'),
        fullName: localStorage.getItem('fullName') || localStorage.getItem('username') || 'User',
        firstName: localStorage.getItem('firstName') || '',
        lastName: localStorage.getItem('lastName') || '',
        email: localStorage.getItem('email') || '',
        department: localStorage.getItem('department') || '',
        isAdmin: localStorage.getItem('username') === 'admin'
    };
}

// ============================================================
// LOGOUT
// ============================================================

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// ============================================================
// ALERT
// ============================================================

function showAlert(message, type) {
    const alert = document.getElementById('alert');
    if (!alert) return;

    alert.textContent = message;
    alert.className = 'alert alert-' + type + ' show';

    clearTimeout(alert._timeout);
    alert._timeout = setTimeout(function() {
        alert.classList.remove('show');
    }, 5000);
}

// ============================================================
// SETUP ENTER KEY NAVIGATION
// ============================================================

function setupEnterNavigation(formElement, fieldIds) {
    if (!formElement) return;

    for (let i = 0; i < fieldIds.length; i++) {
        const field = document.getElementById(fieldIds[i]);
        if (!field) continue;

        field.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();

                // If last field, submit form
                if (i === fieldIds.length - 1) {
                    formElement.dispatchEvent(new Event('submit'));
                    return;
                }

                // Move to next field
                const nextField = document.getElementById(fieldIds[i + 1]);
                if (nextField) {
                    nextField.focus();
                }
            }
        });
    }
}

// ============================================================
// SEARCH BOX ENTER KEY
// ============================================================

function setupSearchEnter(searchBoxId, searchFunction) {
    const searchBox = document.getElementById(searchBoxId);
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
        const d = new Date(dateString);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return dateString;
    }
}

// ============================================================
// SHOW/HIDE ELEMENTS
// ============================================================

function showElement(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
}

function hideElement(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
}
