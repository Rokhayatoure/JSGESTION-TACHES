const email = document.getElementById('email');
const password = document.getElementById('password');
const loginForm = document.getElementById('loginForm');
const emailError = document.getElementById('emailError');
const mdpError = document.getElementById('mdpError');
const loginError = document.getElementById('loginError');

function verifyLogin() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    let error = true;

    // Validation de l'email
    if (emailValue === "") {
        emailError.classList.remove('hidden');
        emailError.textContent = 'Veuillez entrer votre email valide';
        email.classList.add('border-red-500');
        error = false;
    } else {
        emailError.classList.add('hidden');
        email.classList.remove('border-red-500');
    }

    // Validation du mot de passe
    if (passwordValue === "") {
        mdpError.classList.remove('hidden');
        mdpError.textContent = 'Veuillez entrer un mot de passe valide';
        password.classList.add('border-red-500');
        error = false;
    } else {
        mdpError.classList.add('hidden');
        password.classList.remove('border-red-500');
    }

    return error;
}

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (verifyLogin()) {
        // Vérifier les informations d'identification via JSON Server
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.email === email.value.trim() && u.password === password.value.trim());
                if (user) {
                    // Connexion réussie
                    window.location.href = '/view/Liste.html';
                } else {
                    // Identifiants incorrects
                    loginError.classList.remove('hidden');
                    loginError.textContent = "Identifiants incorrects. Veuillez réessayer.";
                }
            })
            .catch(error => {
                console.error('Erreur lors de la vérification des identifiants:', error);
                loginError.classList.remove('hidden');
                loginError.textContent = "Une erreur est survenue. Veuillez réessayer plus tard.";
            });
    }
});
