# {project name}

{description}

## Usage

- [Create a new empty repository](https://github.com/new) on GitHub
- [Setup renovate](https://github.com/apps/renovate) for your new repository. If you previously installed the Renovate application to your account then this is just a box to tick when creating the repository
- [Setup Codecov](https://github.com/apps/codecov) for your new repository. If you previously installed the Codecov application to your account then this is just a box to tick when creating the repository
- Add the previously generated `GH_TOKEN` and `NPM_TOKEN` secrets to the [GitHub secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets) of the new repository
- **Develop your library**: change code in `src/`
- **Test your library**: run `npm jest`
- **Check formatting of your code**: run `npm lint` in your terminal
- **Fix formatting of your code**: run `npm format` in your terminal
- **Create your first release**: [open a pull request](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request) on your project, wait for tests to pass, merge and 💥 your library will be automatically released to npm and a GitHub release will be created

**Optional steps:** (needed only if you're doing them for the first time)

1. Make sure you have [npm 2fa auth-only](https://docs.npmjs.com/about-two-factor-authentication#authorization-only) configured. Releases can't be automated if you have 2fa setup for both authentication and publish. See https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration#authentication-for-plugins
