# ElectronicsPalace - Catalogue de Souris

Catalogue interactif de souris électroniques avec recherche, filtres et fiches détaillées.

## Démarrage rapide

### Installation des dépendances
```bash
npm install
```

### Lancement du serveur de développement
```bash
npm start
```

## Tests automatisés

Les tests Playwright ont été retirés de ce projet.

## Structure du projet

```
New project/
├── index.html              # Page principale
├── styles.css              # Styles CSS
├── app.js                 # Logique JavaScript
├── data/
│   └── mice.js           # Données des souris
├── assets/
│   └── mice/            # Images des souris
├── package.json          # Configuration npm
└── README.md             # Documentation
```

## Fonctionnalités

- **Catalogue interactif** avec +80 souris
- **Recherche en temps réel** avec debounce (300ms)
- **Filtres multiples** : Marque, type, recherche
- **Lazy loading** : 20 produits initiaux, +10 par clic
- **Fiches détaillées** : 5 spécifications standardisées
- **Design responsive** : Mobile et desktop
- **Accessibilité** : ARIA, navigation clavier
- **Couleurs de marque** : Personnalisation visuelle
- **Images optimisées** : Chargement progressif

## Technologies

- **HTML5** : Structure sémantique
- **CSS3** : Grid, animations, variables
- **JavaScript ES6+** : Modules modernes
- **Responsive Design** : Mobile-first

## Navigateurs supportés

Application testée manuellement sur :
- **Chrome** (Chromium)
- **Firefox** 
- **Safari** (WebKit)
