<div align="center">
  <a href="https://epns.surge.sh">
    <img src="https://epns.surge.sh/shot.png" alt="epns" width=400 />
  </a>
</div>

### EPNS Dapp

This is a re-implementation of https://app.epns.io, but with the use of an EPNS subgraph for quicker data fetches.

### Getting started

#### Prerequisites

- Node.JS 12+
- Git

#### Running the app

- Run `yarn` to install node packages.
- Copy `.env.development.sample` `.env.development` and configure appropriately.
- Run `make` to boot app.
- Visit frontend at http://localhost:5555 (or configured port).

### Build for staging

1. Copy `.env.staging.sample` to `.env.staging`
2. Run `yarn build-staging`
3. Serve the generated `build` folder

### Build for production

1. Copy `.env.production.sample` to `.env.production`
2. Run `yarn build-production`
3. Serve the generated `build` folder

### Demos

- https://epns.surge.sh (production)
- https://epns-staging.surge.sh (staging)
