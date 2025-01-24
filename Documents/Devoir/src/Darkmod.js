// Sélectionner le bouton de bascule et le body
const darkModeToggle = document.querySelector('input[type="checkbox"]');
const body = document.body;

// Appliquer le mode sombre si l'utilisateur l'a activé précédemment (dans le localStorage)
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark'); // Ajouter la classe 'dark' au body
    darkModeToggle.checked = true; // Marquer la case comme activée
} else {
    body.classList.remove('dark'); // Retirer la classe 'dark' (mode clair)
    darkModeToggle.checked = false; // Marquer la case comme désactivée
}

// Ajouter un écouteur d'événements sur la case à cocher
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark'); // Activer le mode sombre
        localStorage.setItem('darkMode', 'true'); // Sauvegarder l'état dans le localStorage
    } else {
        body.classList.remove('dark'); // Désactiver le mode sombre
        // localStorage.setItem('darkMode', 'false'); // Sauvegarder l'état dans le localStorage
    }
});

// Ajout de styles pour le mode sombre uniquement sur les couleurs de fond
const styles = document.createElement('style');
styles.innerHTML = `
    body.dark {
        background-color: #121212; /* Fond sombre */
    }
    body.dark .bg-gray-100 {
        background-color: #1a1a1a; /* Arrière-plan plus sombre */
    }
    body.dark .bg-white {
        background-color: #1c1c1c; /* Arrière-plan de couleur blanche assombrie */
    }
    body.dark .bg-gray-200 {
        background-color: #333333; /* Autres éléments gris */
    }
    body.dark .bg-sky-700 {
        background-color: #006f8e; /* Fond plus sombre pour le bleu */
    }
        .dark input[type="search"],
.dark select,
.dark button {
    background-color: #2d3748; /* Fond sombre */
    color: white; /* Texte clair */
    border-color: #4a5568; /* Bordure plus foncée */
}

/* Modifier le style du placeholder pour les champs de recherche */
.dark input::placeholder {
    color: #a0aec0; /* Placeholder clair en mode sombre */
}

/* Ajouter des effets de survol */
.dark button:hover {
    background-color: #2b6cb0; /* Couleur de survol pour les boutons */
}

.dark select:hover,
.dark input[type="search"]:hover {
    border-color: #2b6cb0; /* Changer la bordure au survol */
}

`;
document.head.appendChild(styles);
