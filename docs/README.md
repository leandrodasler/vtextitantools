[![Publish, Deploy and Install App](https://github.com/tiago-freire/vtextitantools/actions/workflows/publish-deploy-and-install.yml/badge.svg)](https://github.com/tiago-freire/vtextitantools/actions/workflows/publish-deploy-and-install.yml)

# Titan Tools Store Theme

![Titan Tools Store Theme](https://vtextitantools.vtexassets.com/arquivos/orange-titantools-logo.svg)

**Titan Tools Store Theme** is a front-end template to help your store get started with VTEX’s core features for businesses selling to other businesses.

# Installing the Titan Tools Store Theme

## Prerequisites

### Set up your development environment

Before starting with the **Titan Tools Store Theme** setup itself, you must:

1. [Set up a workspace to develop in VTEX IO](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-2-basicsetuptodevelopinvtexio) on your machine.
2. Follow [these instructions](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-2-prerequesites) to make sure you meet all the prerequisites to develop using Store Framework.
3. Make sure your store’s catalog is integrated with VTEX Intelligent Search, as described in [this article](https://help.vtex.com/en/tracks/vtex-intelligent-search--19wrbB7nEQcmwzDPl1l4Cb/6wKQgKmu2FT6084BJT7z5V).


### Install required B2B apps
Clone this repository, enter its directory in terminal and run:
```bash
bash ./install-list.sh 
```

Some applications must be installed via [App Store](https://apps.vtex.com). In these cases, a browser window will open for installation.

## How to use

After following the steps above, you are ready to use **Titan Tools Store Theme**. You must:

1. Replace `vendor` on `manifest.json` for your account name
2. Run the `vtex link` command on the CLI.
3. Run the `vtex browse` command to see the store using Titan Tools Store Theme on your browser.

## Customization

You can customize Titan Tools Store Theme according to your store’s business needs. Check our guide on [Customizing the B2B Store Theme](https://developers.vtex.com/vtex-developer-docs/docs/customizing-the-b2b-store-theme) for more information.

## Continuous Delivery

This repository has a [GitHub Actions workflow](../.github/workflows/publish-deploy-and-install.yml) that publishes, deploys and installs this theme to the account indicated in the `vendor` key in manifest.json by pushing the release tag after a `vtex release {patch|minor|major} stable` command runs.

For workflow to work, it's necessary to create an [application key](https://help.vtex.com/pt/tutorial/chaves-de-aplicacao--2iffYzlvvz4BDMr6WGUtet) with publish, install and deploy app permissions for your account.

Then, create the following secrets in your [Github repository secrets](https://docs.github.com/pt/actions/security-guides/using-secrets-in-github-actions) with respectively values of created application key and token:

- `VTEX_TOOLBELT_KEY`
- `VTEX_TOOLBELT_TOKEN`
