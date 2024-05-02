const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const loggedin = document.querySelector('.loggedin');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

// Funktion zum Speichern von Benutzerdaten
function saveUser(username, email, password) {
    const userData = { username, email, password };
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Funktion zum Laden von Benutzerdaten
function loadUser() {
    const userData = localStorage.getItem('userData');
    return JSON.parse(userData);
}

// Registrierungsfunktion
document.querySelector('.register form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const agreeTerms = this.querySelector('input[type="checkbox"]').checked;

    // Überprüfen, ob alle Felder ausgefüllt sind
    if (username && email && password && agreeTerms) {
        saveUser(username, email, password);
        // Zeige das Registrierungs-Popup an
        document.querySelector('.registration-message').classList.add('active');
        // Verstecke das Registrierungs-Formular
        this.reset();
    } else {
        // Zeige die Fehlermeldung an, wenn nicht alle Felder ausgefüllt sind
        document.querySelector('.error-message').classList.add('active');
    }
});

// Schließen des Registrierungs-Popups
document.querySelector('.registration-message .icon-close').addEventListener('click', function() {
    document.querySelector('.registration-message').classList.remove('active');
});

// Schließen des Fehler-Popups
document.querySelector('.error-message .icon-close').addEventListener('click', function() {
    document.querySelector('.error-message').classList.remove('active');
});

// Beim Laden der Seite überprüfen, ob Benutzerdaten im Local Storage gespeichert sind
window.addEventListener('load', function() {
    const email = localStorage.getItem('loginEmail');
    const password = localStorage.getItem('loginPassword');

    if (email && password) {
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;
    }
});

// Einloggen überprüfen und Benutzerdaten abgleichen
document.querySelector('.login form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const userData = loadUser();

    if (userData && email === userData.email && password === userData.password) {
        // Benutzerdaten im Local Storage speichern
        localStorage.setItem('loginEmail', email);
        localStorage.setItem('loginPassword', password);
        
        wrapper.classList.remove('active-popup');
        loggedin.classList.add('active');
        document.querySelector('.open-chat-btn').style.display = 'inline-block';
        document.querySelector('.btnLogin-popup').style.display = 'none';
        document.querySelector('.btnAccount').style.display = 'inline-block'; // Zeige den Logout-Button an
        // Hier können Sie die Logik hinzufügen, um den Benutzer einzuloggen
    } else {
        document.querySelector('.error-login-message').classList.add('active');
    }
});

// Schließen des loggedin Popups
document.querySelector('.loggedin .icon-close').addEventListener('click', function() {
    loggedin.classList.remove('active');
});

// Schließen des Fehler-Popups
document.querySelector('.error-login-message .icon-close').addEventListener('click', function() {
    document.querySelector('.error-login-message').classList.remove('active');
});

const btnAccount = document.querySelector('.btnAccount');
const accountMenu = document.querySelector('.account-menu');
const logoutLink = document.querySelector('.logout-link');

btnAccount.addEventListener('click', () => {
    accountMenu.classList.toggle('active');
});

logoutLink.addEventListener('click', () => {
    accountMenu.classList.remove('active');
    document.querySelector('.logout').classList.add('active');
    // Hier kannst du die Logout-Logik hinzufügen
    document.querySelector('.btnLogin-popup').style.display = 'inline-block';
    document.querySelector('.btnAccount').style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function() {
    const openChatBtn = document.querySelector('.open-chat-btn');
    const chatContainer = document.querySelector('.chat-container');
    const closeChatBtn = document.querySelector('.chat-widget .icon-close');

    openChatBtn.addEventListener('click', function() {
        chatContainer.style.display = 'block';
    });

    closeChatBtn.addEventListener('click', function() {
        chatContainer.style.display = 'none';
    });
});

// Schließen des Logout-Popups
document.querySelector('.logout .icon-close').addEventListener('click', function() {
    document.querySelector('.logout').classList.remove('active');
});