[![Publish, Deploy and Install App](https://github.com/leandrodasler/vtextitantools/actions/workflows/publish-deploy-and-install.yml/badge.svg)](https://github.com/leandrodasler/vtextitantools/actions/workflows/publish-deploy-and-install.yml)

# Titan Tools Store Theme

![Titan Tools Store Theme](https://vtextitantools.vtexassets.com/arquivos/orange-titantools-logo.svg)

**Titan Tools Store Theme** is a front-end template to help your store get started with VTEX’s core features for businesses selling to other businesses.

# Installing the Titan Tools Store Theme

- Log in to the desired VTEX account
- Clone this repository, enter its directory in the terminal and run the [installation script for all necessary apps](../install-list.sh):

  ```bash
  ./install-list.sh
  # or
  bash ./install-list.sh
  # or
  sh ./install-list.sh
  # or, if your operating system does not run shell
  # scripts, run the "vtex install ..." command
  # contained in the install-list.sh file 
  ```

  - Some apps must be installed via [App Store](https://apps.vtex.com). In these cases, a browser window will open for installation.

- After install required apps by [install-list.sh](../install-list.sh) shell script, you are ready to use **Titan Tools Store Theme**, avaiable at https://{{account}}.myvtex.com.

## Customization

You can customize Titan Tools Store Theme according to your store’s business needs. Check our guide on [Customizing the B2B Store Theme](https://developers.vtex.com/vtex-developer-docs/docs/customizing-the-b2b-store-theme) for more information.

## Continuous Delivery

This repository has a [GitHub Actions workflow](../.github/workflows/publish-deploy-and-install.yml) that publishes, deploys and installs this theme to the account indicated in the `vendor` key in manifest.json by pushing the release tag after a `vtex release {patch|minor|major} stable` command runs.

For workflow to work, it's necessary to create an [application key](https://help.vtex.com/pt/tutorial/chaves-de-aplicacao--2iffYzlvvz4BDMr6WGUtet) with publish, install and deploy app permissions for your account.

Then, create the following secrets in your [Github repository secrets](https://docs.github.com/pt/actions/security-guides/using-secrets-in-github-actions) with respectively values of created application key and token:

- `VTEX_TOOLBELT_KEY`
- `VTEX_TOOLBELT_TOKEN`
