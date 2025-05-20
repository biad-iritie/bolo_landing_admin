# BOLO Landing Admin

BOLO Landing Admin est une application web moderne de gestion des promotions, construite avec Next.js 14 et TypeScript. Cette plateforme permet aux administrateurs de gérer efficacement les promotions, suivre les stocks et optimiser les stratégies marketing.

## 🚀 Fonctionnalités

- **Gestion des Promotions**
  - Création et modification de promotions
  - Gestion des prix (régulier et promotionnel)
  - Calcul automatique des remises
  - Catégorisation des promotions
  - Suivi des statuts (actif/inactif)

- **Gestion des Stocks**
  - Suivi en temps réel des quantités
  - Alertes de stock bas
  - Seuils de réapprovisionnement personnalisables

- **Interface Utilisateur**
  - Design moderne et responsive
  - Tableau de bord intuitif
  - Filtres et recherche avancée
  - Statistiques en temps réel

- **Sécurité**
  - Authentification sécurisée
  - Gestion des accès administrateur
  - Validation des données

## 🛠️ Technologies

- **Frontend**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui
  - Zustand (State Management)
  - React Hook Form
  - Zod (Validation)

- **Outils de Développement**
  - ESLint
  - Prettier
  - TypeScript
  - Git

## 📋 Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn
- Git

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/landing_admin.git
   cd landing_admin
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env.local
   ```
   Modifiez les variables dans `.env.local` selon votre environnement.

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Accéder à l'application**
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Structure du Projet

```
landing_admin/
├── src/
│   ├── app/                    # Routes et pages Next.js
│   │   ├── admin/             # Interface d'administration
│   │   └── api/               # API Routes
│   ├── components/            # Composants React réutilisables
│   │   ├── ui/               # Composants UI de base
│   │   └── promotions/       # Composants spécifiques aux promotions
│   ├── lib/                   # Utilitaires et configurations
│   │   ├── store/            # État global (Zustand)
│   │   ├── types/            # Types TypeScript
│   │   └── promotions/       # Logique métier des promotions
│   └── styles/               # Styles globaux
├── public/                    # Assets statiques
└── ...
```

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# Ajoutez d'autres variables selon vos besoins
```

## 📝 Utilisation

### Gestion des Promotions

1. **Créer une Promotion**
   - Accédez à `/admin/promotions/new`
   - Remplissez le formulaire avec les détails de la promotion
   - Validez pour créer la promotion

2. **Modifier une Promotion**
   - Accédez à la liste des promotions
   - Cliquez sur "Modifier" pour la promotion souhaitée
   - Mettez à jour les informations
   - Sauvegardez les modifications

3. **Gérer les Stocks**
   - Consultez le tableau de bord pour voir les alertes de stock
   - Mettez à jour les quantités selon les besoins
   - Configurez les seuils de réapprovisionnement
