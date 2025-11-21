# TP

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Deployer sur Render.com

Ce depot contient deja les fichiers necessaires pour une mise en production sur [Render.com](https://render.com):

- `render.yaml` declare un service **Static Site** avec la commande de build `npm install && npm run build` et publie le dossier `dist/tp/browser`.
- `static.json` configure une redirection globale vers `index.html`, indispensable pour une application Angular monopage.

### Procedure

1. Pousser les changements sur votre depot Git.
2. Sur le tableau de bord Render, creer un **Static Site** a partir de ce depot.
3. Render detecte automatiquement `render.yaml`; valider les parametres proposes puis lancer le deploiement.
4. Une fois le build termine, le site est accessible a l’adresse fournie par Render (ex: `https://tp-angular.onrender.com`).

Pour les builds suivants, Render regenerera automatiquement le site a chaque push sur la branche surveillee.
