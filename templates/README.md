# {project name}

{description}

## Usage

Using this CLI requires a bit of setup, but way less than if you had to start from 0. Here's what you need to do:

**Required steps:** (needed every time you want to use the CLI)

- [Create a new empty repository](https://github.com/new) on GitHub
- [Setup renovate](https://github.com/apps/renovate) for your new repository. If you previously installed the Renovate application to your account then this is just a box to tick when creating the repository
- [Setup Codecov](https://github.com/apps/codecov) for your new repository. If you previously installed the Codecov application to your account then this is just a box to tick when creating the repository
- Add the previously generated `GH_TOKEN` and `NPM_TOKEN` secrets to the [GitHub secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets) of the new repository
- Initiate project `npx ts-swc-library-template`
- Setup semantic releases: run `npm semantic-release-cli setup` in a terminal (This will ask for your npm and GitHub credentials)
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
