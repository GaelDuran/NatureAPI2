# NatureApi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Mapbox setup

This app uses Mapbox GL for maps. Provide a public Mapbox token before running the app. Two options:

- Edit `src/index.html` and set `window.__MAPBOX_TOKEN__ = 'YOUR_TOKEN'`.
- Or set the token as part of your build pipeline and inject it into `index.html`.

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

## CI / CD and Deployment (Frontend)

This repository includes GitHub Actions workflows to build, containerize and deploy the Angular frontend.

- **Build & Publish**: `.github/workflows/frontend-build-and-push.yml` — builds the Angular app (production), writes `src/environments/secret.env.ts` from GitHub secrets, builds the Docker image and pushes it to GitHub Container Registry (`ghcr.io/${{ github.repository_owner }}/nature-api`).
- **Deploy to Render**: `.github/workflows/frontend-deploy-render.yml` — triggers a deploy on Render by calling Render's Deploys API. You need to create a Render Web Service and set the required secrets.

Required repository secrets:
- `PRODUCTION_API_URL` — public URL of your deployed .NET API (used at build time to compile into the app)
- `MAPBOX_TOKEN` — Mapbox public token
- `GITHUB_TOKEN` — provided by GitHub automatically (used to push to GHCR)
- `RENDER_API_KEY` — Render API key (for triggering deploy)
- `RENDER_SERVICE_ID` — Render service ID to trigger deploy

Notes:
- The workflow writes `nature-api/src/environments/secret.env.ts` at runtime in the runner. Ensure `PRODUCTION_API_URL` and `MAPBOX_TOKEN` are set in repository secrets before running the workflow on `main`.
- If you prefer Docker Hub instead of GHCR, update the `frontend-build-and-push.yml` workflow to login/push to `docker.io` and provide Docker Hub credentials as secrets.

