# `@plandek-utils/ts-clean-key`

[![npm version](https://badge.fury.io/js/%40plandek-utils%2Fts-clean-key.svg)](https://badge.fury.io/js/%40plandek-utils%2Fts-clean-key)
[![Build Status](https://travis-ci.org/plandek-utils/ts-clean-key.svg?branch=master)](https://travis-ci.org/plandek-utils/ts-clean-key)
[![Maintainability](https://api.codeclimate.com/v1/badges/0a2ee0323272ad4910b5/maintainability)](https://codeclimate.com/github/plandek-utils/ts-clean-key/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0a2ee0323272ad4910b5/test_coverage)](https://codeclimate.com/github/plandek-utils/ts-clean-key/test_coverage)

[TypeDoc generated docs in here](https://plandek-utils.github.io/ts-clean-key)

[Github repo here](https://github.com/plandek-utils/ts-clean-key)

Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_`). It also removes multiple dashes in a row and replaces them for a single dash (this can be optionally disabled)

## Installation

`yarn add @plandek-utils/ts-clean-key` or `npm install @plandek-utils/ts-clean-key`.

## Usage

```typescript
import { cleanKey } from "@plandek-utils/ts-clean-key";

cleanKey(""); // => ""
cleanKey("  a - b"); // => "a-b"
cleanKey("  some Stuff 🚀 \n ñaaa --- a"); // => "sometuffaaa-a"
```

By default, `cleanKey` will replace many resulting dashes for a single dash. You can disable this behaviour by passing an optional second options argument:

```typescript
import { cleanKey } from "@plandek-utils/ts-clean-key";
cleanKey("  some---a "); // => "some-a"
cleanKey("  some---a ", { replaceManyDashes: true }); // => "some-a"
cleanKey("  some---a ", { replaceManyDashes: false }); // => "some---a"
```

This can be used to keep clean a string made out of a combination of other clean keys

```typescript
import { cleanKey } from "@plandek-utils/ts-clean-key";
const a = cleanKey(" something-is-here "); // => "something-is-here"
const b = cleanKey(" and-there   "); // => "and-there"
const key = `${a}--${b}`; // => "something-is-here--and-there"

cleanKey(key) === key; // => false (it will change the `here--and` for a `here-and`)
cleanKey(key, { replaceManyDashes: false }) === key; // => true
```

### `cleanKeySimple`

function

## Breaking changes warning

Since v2.0 the `cleanKey` is not the default export. Instead both `cleanKey` and `cleanKeySimple` are named exports.

```typescript
// v1.x
import cleanKey from "@plandek-utils/ts-clean-key";

// v2.x
import { cleanKey } from "@plandek-utils/ts-clean-key";
```

## Development, Commits, versioning and publishing

<details><summary>See documentation for development</summary>
<p>

See [The Typescript-Starter docs](https://github.com/bitjson/typescript-starter#bump-version-update-changelog-commit--tag-release).

### Commits and CHANGELOG

For commits, you should use [`commitizen`](https://github.com/commitizen/cz-cli)

```sh
yarn global add commitizen

#commit your changes:
git cz
```

As typescript-starter docs state:

This project is tooled for [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) to make managing releases easier. See the [standard-version](https://github.com/conventional-changelog/standard-version) documentation for more information on the workflow, or [`CHANGELOG.md`](CHANGELOG.md) for an example.

```sh
# bump package.json version, update CHANGELOG.md, git tag the release
yarn run version
```

You may find a tool like [**`wip`**](https://github.com/bitjson/wip) helpful for managing work in progress before you're ready to create a meaningful commit.

### Creating the first version

Once you are ready to create the first version, run the following (note that `reset` is destructive and will remove all files not in the git repo from the directory).

```sh
# Reset the repo to the latest commit and build everything
yarn run reset && yarn run test && yarn run doc:html

# Then version it with standard-version options. e.g.:
# don't bump package.json version
yarn run version -- --first-release

# Other popular options include:

# PGP sign it:
# $ yarn run version -- --sign

# alpha release:
# $ yarn run version -- --prerelease alpha
```

And after that, remember to [publish the docs](#publish-the-docs).

And finally push the new tags to github and publish the package to npm.

```sh
# Push to git
git push --follow-tags origin master

# Publish to NPM (allowing public access, required if the package name is namespaced like `@somewhere/some-lib`)
yarn publish --access public
```

### Publish the Docs

```sh
yarn run doc:html && yarn run doc:publish
```

This will generate the docs and publish them in github pages.

### Generate a version

There is a single yarn command for preparing a new release. See [One-step publish preparation script in TypeScript-Starter](https://github.com/bitjson/typescript-starter#one-step-publish-preparation-script)

```sh
# Prepare a standard release
yarn prepare-release

# Push to git
git push --follow-tags origin master

# Publish to NPM (allowing public access, required if the package name is namespaced like `@somewhere/some-lib`)
yarn publish --access public
```

</p>
</details>
