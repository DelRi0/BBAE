<p align="center"><br><br><img width="400" src="static/images/logo/pc_bbae.png"/><br><br></p>

<p align="center"><b>Make sure to read this document thoroughly, should you find any mistakes or missing information, please inform your team</b></p>

## Getting started

First you need to install dependencies:

```bash
yarn install
```

Now you can start the app in development env:

```bash
yarn start
```

Or you can start the app in production env:

```bash
yarn start-prod
```

To build this project simply run:

```bash
yarn build
```

Analyse bundle contents after a build:

```bash
yarn analyse
```

Apply prettier formatter to the whole project:

```bash
yarn format
```

## Docker

Build docker image with latest tag

```bash
./build-image.sh
```

Run docker image

```bash
docker run -d -p 80:3000 bbae:latest
```

Change mapping /etc/host

```bash
127.0.0.1       app.bbaecache.com
```

Open via browser

```bash
app.bbaecache.com
```

Run web app with docker-compose

```bash
docker-compose up -d
```

## Enviroment variables

We have 3 files env. The default env file `.env` (all environments), `.env.development` (development environment), and `.env.production` (production environment).

`.env.local` always overrides the defaults set.

Note: `.env`, `.env.development`, and `.env.production` files should be included in your repository as they define defaults. `.env*.local` should be added to `.gitignore`, as those files are intended to be ignored. `.env.local` is where secrets can be stored.

## Translations

Please check translation files in folder `src/locales`

## Conventions and Best Practices

Make sure that you install and enable [Prettier](https://prettier.io/) in the IDE / Editor of your choice. Allow prettier to format files of these types: `js, jsx, ts, tsx, css, scss, html`

Please follow this React conventions:

- Always use functional components
- Do not use React class components
- Don't use style attribute inside the components

Please follow these code styles:

- Do not use `var` or `function` keywords
- Do not add any new `.js`, `.css`, and `.less` files to the project

Please follow these Git conventions:

- Make sure that you always work on a separate branch
- Branch name must have this format `__type__/__ticket__-your-title`, for example: `feat/1234-feature-name`
- Commit messages must have this format: `__ticket__: Your description`, for example: `1234: Commit mesage`
- You can use any of these types: `feat`, `fix`, `refactor`, `style`, `docs`, `test` for branch names
- Pull request title must have this format: `__ticket__: Your title`, for example `1234: Feature name`
- Pull requests that do not follow these rules **will not be merged**

## Overall application structure

- The application based on NextJS framework.
- All application components can be found inside the `src/components` folder
- You can add global styles inside the `src/pages/styles.scss` file
- All routes are follow the nextjs route rule. Please check the [document](https://nextjs.org/docs/routing/introduction)
- All dependencies and service instances are instantiated inside the `src/services` file

## Ant Design

Before jumping into action, make sure to skim trough the Ant docs to really understand how it works.

- Documentation: [https://ant.design/docs/react/introduce](https://ant.design/docs/react/introduce)
- Themes: [https://ant.design/docs/react/customize-theme](https://ant.design/docs/react/customize-theme)
- Components: [https://ant.design/components/overview/](https://ant.design/components/overview/)
- Icons: [https://ant.design/components/icon/](https://ant.design/components/icon/)
