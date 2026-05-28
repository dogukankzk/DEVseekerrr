# DevSeekr 🚀

Application mobile React Native / Expo pour trouver son premier job développeur.

---

## Prérequis

- [Node.js LTS](https://nodejs.org/) (v18 ou v20 recommandé — **pas v22**)
- [npm](https://www.npmjs.com/) v9+
- [Expo Go](https://expo.dev/go) installé sur ton téléphone (iOS ou Android)
- Un compte [Expo](https://expo.dev/) (optionnel pour le scan QR)

---

## Installation

```bash
# 1. Cloner le repo
git clone git@github.com:dogukankzk/DEVseekerrr.git
cd DEVseekerrr

# 2. Installer les dépendances
npm install
```

---

## Lancer le projet

```bash
npx expo start --clear
```

Le `--clear` vide le cache Metro — à utiliser après chaque modification de `babel.config.js` ou `metro.config.js`.

### Ouvrir l'app

| Plateforme | Commande |
|---|---|
| iOS Simulator | Appuie sur `i` dans le terminal |
| Android Emulator | Appuie sur `a` dans le terminal |
| Téléphone physique | Scanne le QR code avec l'app **Expo Go** |

---

## Structure du projet

```
DevSeekr/
├── src/
│   ├── components/
│   │   └── screens/              # Tous les écrans de l'app
│   │       ├── SplashScreen.tsx      → Écran de chargement (2.5s)
│   │       ├── OnboardingScreen.tsx  → Présentation de l'app
│   │       ├── LoginScreen.tsx       → Connexion
│   │       ├── SignupScreen.tsx      → Inscription
│   │       ├── HomeScreen.tsx        → Liste des offres
│   │       ├── JobDetailScreen.tsx   → Détail d'une offre
│   │       ├── FavoritesScreen.tsx   → Offres sauvegardées
│   │       └── ProfileScreen.tsx     → Profil utilisateur
│   ├── navigation/
│   │   ├── types.ts              → Types TypeScript des routes
│   │   ├── RootNavigator.tsx     → Navigation racine (stack)
│   │   ├── AuthNavigator.tsx     → Stack Login / Signup
│   │   └── MainNavigator.tsx     → Bottom tabs (Home, Favoris, Profil)
│   └── styles/
│       └── theme.ts              → Couleurs, spacing, typographie
├── App.tsx                       → Point d'entrée React
├── index.js                      → Point d'entrée Expo
├── app.json                      → Config Expo (nom, icône, splash...)
├── babel.config.js               → Config Babel
└── metro.config.js               → Config Metro bundler
```

---

## Ajouter / modifier un écran

### Modifier un écran existant

Ouvre le fichier correspondant dans `src/components/screens/` et modifie le JSX et les styles.

Exemple — changer la couleur du bouton dans `OnboardingScreen.tsx` :

```tsx
// Avant
boutonPrimaire: {
  backgroundColor: '#7c3aed',
  ...
}

// Après
boutonPrimaire: {
  backgroundColor: '#2563eb',
  ...
}
```

### Créer un nouvel écran

**1. Créer le fichier**

```tsx
// src/components/screens/MonNouvelEcran.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MonNouvelEcran() {
  return (
    <View style={styles.container}>
      <Text>Mon nouvel écran</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
```

**2. Ajouter la route dans `src/navigation/types.ts`**

```ts
export type RootStackParamList = {
  // ... routes existantes
  MonNouvelEcran: undefined; // ou { parametre: string } si tu passes des données
};
```

**3. Enregistrer l'écran dans le navigator concerné**

```tsx
// Dans RootNavigator.tsx (ou AuthNavigator / MainNavigator selon le cas)
import MonNouvelEcran from '../components/screens/MonNouvelEcran';

<Stack.Screen name="MonNouvelEcran" component={MonNouvelEcran} />
```

**4. Naviguer vers cet écran**

```tsx
navigation.navigate('MonNouvelEcran');

// Avec paramètres
navigation.navigate('MonNouvelEcran', { parametre: 'valeur' });
```

---

## Navigation — comment ça marche

L'app utilise [React Navigation v7](https://reactnavigation.org/) avec une structure en 3 niveaux :

```
RootNavigator (Stack)
├── SplashScreen
├── OnboardingScreen
├── AuthNavigator (Stack)
│   ├── LoginScreen
│   └── SignupScreen
└── MainNavigator (Bottom Tabs)
    ├── HomeStack (Stack)
    │   ├── HomeScreen
    │   └── JobDetailScreen
    ├── FavoritesScreen
    └── ProfileScreen
```

---

## Stack technique

| Outil | Version | Rôle |
|---|---|---|
| Expo SDK | ~54.0.33 | Framework React Native |
| React Native | 0.81.5 | Base mobile |
| React | 19.1.0 | UI |
| React Navigation | v7 | Navigation entre écrans |
| TypeScript | ~5.9 | Typage statique |
| babel-preset-expo | ~54.0.10 | Transpilation |

---

## Commandes utiles

```bash
# Lancer le projet (avec reset du cache)
npx expo start --clear

# Vérifier les erreurs TypeScript
npx tsc --noEmit

# Installer un package compatible avec Expo SDK 54
npx expo install <nom-du-package>

# Mettre à jour les dépendances Expo
npx expo install --fix
```

> ⚠️ Toujours utiliser `npx expo install` plutôt que `npm install` pour les packages natifs — ça garantit la compatibilité avec la version SDK installée.

---

## Workflow Git

```bash
# Créer une branche pour une nouvelle feature
git checkout -b feature/nom-de-la-feature

# Ajouter et commiter
git add .
git commit -m "feat: description de la modification"

# Pusher
git push -u origin feature/nom-de-la-feature
```

### Convention de commits

| Préfixe | Usage |
|---|---|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `style:` | Changement visuel / CSS |
| `refactor:` | Refactoring sans changement de comportement |
| `chore:` | Config, dépendances, tooling |
