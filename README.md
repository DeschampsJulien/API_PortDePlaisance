# ⚓️ Port de Plaisance – API & Dashboard Capitainerie

Une application Node.js / Express / MongoDB permettant la gestion des **catways**, des **réservations** et des **utilisateurs (admin / user)**.  
Elle inclut un tableau de bord sécurisé pour la **capitainerie**.

---

## 🚀 Fonctionnalités principales

- 🔐 **Authentification JWT (token sécurisé en cookie)**
- 👥 Gestion des rôles : `admin` / `user`
- 🧭 Dashboard EJS avec affichage dynamique :
  - Liste des catways
  - Indicateur d’état (turquoise)
  - Indicateur rouge “📍 Location en cours”
- 🧱 API REST (CRUD complet pour utilisateurs et réservations)
- 🧰 Compatible avec **MongoDB Atlas**

---

## 🛠️ Technologies utilisées

- **Node.js** + **Express.js**
- **MongoDB Atlas** (base de données cloud)
- **Mongoose**
- **EJS** (moteur de templates)
- **JWT** (authentification sécurisée)
- **bcrypt** (hachage des mots de passe)
- **Bootstrap 5** (interface simple et responsive)

---

## ⚙️ Installation locale

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/ton-utilisateur/port-de-plaisance.git
cd port-de-plaisance
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Créer le fichier `.env`
Crée un fichier `.env` à la racine et ajoute :

```env
PORT=4000
MONGO_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/PortDePlaisance"
JWT_SECRET="votreSecretJWTsuperSecurise"
```

> ⚠️ Remplace `<user>`, `<password>` et `<cluster>` par tes identifiants Atlas.

---

## 🧩 Démarrage du serveur

### Mode développement :
```bash
npx nodemon src/index.js
```

### Mode production :
```bash
node src/index.js
```

Le serveur tourne sur :  
👉 [http://localhost:4000](http://localhost:4000)

---

## 🧾 Structure du projet

```
📦 src/
 ┣ 📂 controllers/
 ┃  ┣ 📜 authController.js  
 ┃  ┣ 📜 catwayController.js
 ┃  ┣ 📜 reservationController.js
 ┃  ┗ 📜 userController.js
 ┣ 📂 middleware/
 ┃  ┗ 📜 authMiddleware.js
 ┣ 📂 models/
 ┃  ┣ 📜 userModel.js
 ┃  ┣ 📜 reservationModel.js
 ┃  ┗ 📜 catwayModel.js
 ┣ 📂 routes/
 ┃  ┣ 📜 authRoutes.js
 ┃  ┗ 📜 dashboardRoutes.js
 ┣ 📂 views/
 ┃  ┣ 📂 dashboard
 ┃  ┃  ┣ 📜 catwayReservations.ejs
 ┃  ┃  ┣ 📜 catways.ejs
 ┃  ┃  ┣ 📜 reservations.ejs
 ┃  ┃  ┗ 📜 users.ejs
 ┃  ┣ 📜 dashboard.ejs
 ┃  ┣ 📜 layout.ejs
 ┃  ┗ 📜 login.ejs
 ┣ 📜 createAdmin.js
 ┣ 📜 importData.js
 ┗ 📜 index.js
```

---

## 🔑 Authentification & Rôles

| Route | Méthode | Description | Accès |
|--------|----------|--------------|--------|
| `/auth/register` | POST | Créer un nouvel utilisateur | Public |
| `/auth/login` | POST | Connexion utilisateur (retourne un cookie JWT) | Public |
| `/auth/logout` | GET | Déconnexion | Connecté |
| `/dashboard` | GET | Accès au tableau de bord | Connecté |


---

## 🧪 Exemple d’appel API (via Postman)

### ➕ Créer un utilisateur
**POST** → `http://localhost:4000/auth/register`
```json
{
  "name": "Julien",
  "email": "julien@marina.fr",
  "password": "Julien123",
  "role": "admin"
}
```

### 🔐 Connexion
**POST** → `http://localhost:4000/auth/login`
```json
{
  "email": "julien@marina.fr",
  "password": "Julien123"
}
```

✅ Si les identifiants sont corrects :
- Un **cookie JWT** est créé.
- Tu es redirigé vers `/dashboard`.

---

## 🔐 Middleware de sécurité

### `verifyToken`
- Vérifie la présence et la validité du cookie JWT.  
- Redirige vers `/auth/login` si non connecté.

---

## 🧹 Commandes utiles

| Commande | Description |
|-----------|--------------|
| `npm start` | Lance le serveur |
| `npx nodemon src/index.js` | Relance automatiquement à chaque modification |
| `npm install bcrypt jsonwebtoken mongoose ejs express dotenv cookie-parser method-override` | Installe toutes les dépendances nécessaires |

---

## 🧑‍💻 Auteur

**Julien Descamps**  
📧 `julien@marina.fr`  
⚓ Projet : *Port de Plaisance — Gestion des Réservations Capitainerie*
