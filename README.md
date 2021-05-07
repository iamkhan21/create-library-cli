# create-library-cli

[![GitHub license](https://img.shields.io/github/license/iamkhan21/create-library-cli?style=flat)](https://github.com/iamkhan21/create-library-cli/blob/master/LICENSE) [![Tests](https://github.com/iamkhan21/create-library-cli/workflows/CI/badge.svg)](https://github.com/iamkhan21/create-library-cli/actions) ![npm](https://img.shields.io/npm/v/create-library-cli)

---

The interactive CLI will help you create and configure your library project automatically. This allows you to easily develop, collaborate on and publish a JavaScript library with all the modern tooling you'd expect from the current JavaScript ecosystem.

**Why should you use this?** One of the hidden challenges of authoring opensource JavaScript libraries is to provide a project that is easy to contribute to. You want people to join your project. Doing so requires a good amount of boilerplate: testing, code coverage, dependencies maintenance, release scripts, tooling requirements (Node.js, Yarn and which versions are we using again?), code editor configuration, formatting, linting... Well, this is the goal of this template: **to provide sensible and modern defaults to all those subjects**. So that once set up, you can focus on ⌨️ coding, 🙌 collaborating and 🚀 shipping.

**The goals of the CLI are to:**
- Ease the contribution of the library by providing reproducible environments for developers and CI
- Automate as much as possible, from testing to releasing and upgrading dependencies

**Features:**
- [EditorConfig](https://editorconfig.org/): easy contributions from any code editor.
- [ESLint](https://eslint.org/): launched in the `npm lint` script.
- [Prettier](https://prettier.io/): launched in the `npm lint` script, with markdown, JavaScript, CSS and JSON files support (including automatic [`package.json` formatting](https://github.com/matzkoh/prettier-plugin-packagejson)).
- [Node.js](https://nodejs.org/) version pinning: via [nvm](https://github.com/nvm-sh/nvm), so anyone contributing or any system accessing your library will use the same Node.js version without having to think about it.
- [Jest](https://jestjs.io/): launched in the `npm test` script.
- [GitHub actions](https://github.com/features/actions): automatic testing and releasing from GitHub: npm publish and GitHub releases are automatically created. Note that the package.json in your repository is never updated (the version is always `0.0.0-development`), only the one in npm is updated. This is surprising at first but as long as you display the published version in your README (like this template does) then you're fine. Find more information about this in the [semantic-release documentation](https://semantic-release.gitbook.io/semantic-release/support/faq#why-is-the-package-jsons-version-not-updated-in-my-repository).
- [semantic-release](https://semantic-release.gitbook.io/semantic-release/): allows for automatic releases based on semver.org and [conventional commits specification](https://www.conventionalcommits.org/). The defaults are taken from the [Angular git commit guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
- [Codecov](https://codecov.io/): launched in the `npm test` script on CI, ensures code coverage does not decrease on pull requests _(free for public and private repositories)_.
- [Renovate](https://renovate.whitesourcesoftware.com/) configured with the [JavaScript library preset](https://docs.renovatebot.com/presets-config/#configjs-lib): this will automatically update your dependencies by opening pull request for you to approve or not. So you never have to think about it _(free for public and private repositories)_.
- [TypeDoc](https://typedoc.org/): generate API documentation (HTML or JSON) [without a mess of JSDoc tags](https://blog.cloudflare.com/generating-documentation-for-typescript-projects/) to maintain


## Usage
Using this CLI requires a bit of setup, but way less than if you had to start from 0. Here's what you need to do:

**Required steps:** (needed every time you want to use the CLI)

- [Create a new empty repository](https://github.com/new) on GitHub
- [Setup renovate](https://github.com/apps/renovate) for your new repository. If you previously installed the Renovate application to your account then this is just a box to tick when creating the repository
- [Setup Codecov](https://github.com/apps/codecov) for your new repository. If you previously installed the Codecov application to your account then this is just a box to tick when creating the repository
- Add the previously generated `GH_TOKEN` and `NPM_TOKEN` secrets to the [GitHub secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets) of the new repository
- Initiate project `npx ts-swc-library-template`
- Setup semantic releases: run `npm install -g semantic-release-cli && semantic-release-cli setup` in a terminal (This will ask for your npm and GitHub credentials)
- Install dependencies: run `npm i` in your terminal
- **Develop your library**: change code in `src/`
- **Test your library**: run `npm jest --watch`
- **Check formatting of your code**: run `npm lint` in your terminal
- **Fix formatting of your code**: run `npm format` in your terminal
- **Create your first release**: [open a pull request](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request) on your project, wait for tests to pass, merge and 💥 your library will be automatically released to npm and a GitHub release will be created

**Optional steps:** (needed only if you're doing them for the first time)

1. Make sure you have [npm 2fa auth-only](https://docs.npmjs.com/about-two-factor-authentication#authorization-only) configured. Releases can't be automated if you have 2fa setup for both authentication and publish. See https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration#authentication-for-plugins


## Generate your API docs

The src folder is analyzed and documentation is automatically generated using [TypeDoc](https://github.com/TypeStrong/typedoc).

```sh
npm doc:dev
```

This command generates API documentation for your library in HTML format and opens it in a browser.

Since types are tracked by Typescript, there's no need to indicate types in JSDoc format. For more information, see the [TypeDoc documentation](http://typedoc.org/guides/doccomments/).

To generate and publish your documentation to [GitHub Pages](https://pages.github.com/) use the following command:

```sh
npm doc:publish
```

Once published, your documentation should be available at the proper GitHub Pages URL for your repo.

