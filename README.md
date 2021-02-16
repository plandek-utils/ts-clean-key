# `@plandek-utils/ts-clean-key`

[![npm version](https://badge.fury.io/js/%40plandek-utils%2Fts-clean-key.svg)](https://badge.fury.io/js/%40plandek-utils%2Fts-clean-key)
[![Build Status](https://travis-ci.org/plandek-utils/ts-clean-key.svg?branch=master)](https://travis-ci.org/plandek-utils/ts-clean-key)
[![Maintainability](https://api.codeclimate.com/v1/badges/0a2ee0323272ad4910b5/maintainability)](https://codeclimate.com/github/plandek-utils/ts-clean-key/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0a2ee0323272ad4910b5/test_coverage)](https://codeclimate.com/github/plandek-utils/ts-clean-key/test_coverage)

[TypeDoc generated docs in here](https://plandek-utils.github.io/ts-clean-key)

[Github repo here](https://github.com/plandek-utils/ts-clean-key)

Removes bad chars for a string key (all except number `0-9`, lowercase ascii7 letters `a-z`, dash `-` and underscore `_`).

It also removes multiple dashes in a row and replaces them for a single dash, which can be [optionally disabled](#replacemanydashes-option-and-functions).

It can optionally also allow uppercase ascii7 letters `A-Z` [with a toggle](#casesensitive-option-and-functions).

It can optionally also allow extra characters, like [dots](#mode-dots-option-and-functions) or other [special characters](#mode-specials-option-and-functions), by using a `mode` option.

## Installation

`yarn add @plandek-utils/ts-clean-key` or `npm install @plandek-utils/ts-clean-key`.

## Usage

```typescript
import { cleanKey } from "@plandek-utils/ts-clean-key";

cleanKey(""); // => ""
cleanKey("  a - b"); // => "a-b"
cleanKey("  some Stuff 🚀 \n ñaaa --- a"); // => "sometuffaaa-a"
```

### `replaceManyDashes` option and functions

By default, `cleanKey` will replace many resulting dashes for a single dash. You can disable this behaviour by passing `replaceManyDashes: false` in the optional options argument, or by using the `cleanKeySimple()` function.

```typescript
import { cleanKey, cleanKeySimple } from "@plandek-utils/ts-clean-key";

cleanKey(" something-is---here "); // => "something-is-here"
cleanKey(" something-is---here ", { replaceManyDashes: false }); // => "something-is---here"
cleanKeySimple(" something-is---here "); // => "something-is---here"
```

### `caseSensitive` option and functions

By default, `cleanKey` will not allow uppercase ascii7 letters `A-Z`. You can change this behaviour by passing `caseSensitive: false` in the optional second argument, or by using the `cleanKeyCI()` or `cleanKeySimpleCI()` functions

```typescript
import { cleanKey, cleanKeyCI, cleanKeySimpleCI } from "@plandek-utils/ts-clean-key";

cleanKey(" Remove---Me "); // => "emove-e"
cleanKey(" Remove---Me ", { caseSensitive: false }); // => "Remove-Me"
cleanKeyCI(" Remove---Me "); // => "Remove-Me"

cleanKey(" Remove---Me ", { replaceManyDashes: false }); // => "emove---e"
cleanKey(" Remove---Me ", { replaceManyDashes: false, caseSensitive: false }); // => "Remove---Me"
cleanKeySimpleCI(" Remove---Me "); // => "Remove---Me"
```

### `mode: dots` option and functions

By default, `cleanKey` will not allow dots `.`. You can change this behaviour by passing `mode: CharAllowanceMode.Dots` (or `mode: "dots") in the optional second argument, or by using the `cleanKeyCIWithDots()`, `cleanKeyWithDots()`, `cleanKeySimpleWithDot()` or `cleanKeySimpleCIWithDots()` functions.

```typescript
import {
  cleanKey,
  cleanKeyCI,
  cleanKeySimpleWithDots,
  cleanKeySimpleCIWithDots,
  cleanKeyWithDots,
  CharAllowanceMode,
} from "@plandek-utils/ts-clean-key";

cleanKey(" Re.|~:/move---Me "); // => "emove-e"

cleanKey(" Re.|~:/move---Me ", { mode: CharAllowanceMode.Dots }); // => "e.move-e"
cleanKeyWithDots(" Re.|~:/move---Me "); // => "e.move-e"

cleanKey(" Re.|~:/move---Me ", { caseSensitive: false, mode: CharAllowanceMode.Dots }); // => "Re.move-Me"
cleanKeyWithDots(" Re.|~:/move---Me ", { caseSensitive: false }); // => "Re.move-Me"
cleanKeyCI(" Re.|~:/move---Me ", { mode: CharAllowanceMode.Dots }); // => "Re.move-Me"

cleanKey(" Re.|~:/move---Me ", { replaceManyDashes: false, mode: CharAllowanceMode.Dots }); // => "e.move---e"
cleanKeyWithDots(" Re.|~:/move---Me ", { replaceManyDashes: false }); // => "e.move---e"
cleanKeySimpleWithDots(" Re.|~:/move---Me "); // => "e.move---e"

cleanKey(" Re.|~:/move---Me ", { caseSensitive: false, mode: CharAllowanceMode.Dots, replaceManyDashes: false }); // => "Re.move---Me"
cleanKeyWithDots(" Re.|~:/move---Me ", { caseSensitive: false, replaceManyDashes: false }); // => "Re.move---Me"
cleanKeyCI(" Re.|~:/move---Me ", { mode: CharAllowanceMode.Dots, replaceManyDashes: false }); // => "Re.move---Me"
cleanKeySimpleCIWithDots(" Re.|~:/move---Me "); // => "Re.move---Me"
```

### `mode: specials` option and functions

Similar to the `dots` mode, but allowing also pipes `|`, colons `:`, and slashes `/`.
You can change this behaviour by passing `mode: CharAllowanceMode.Specials` (or `mode: "specials") in the optional second argument, or by using the `cleanKeyCIWithSpecials()`, `cleanKeyWithSpecials()`, `cleanKeySimpleWithDot()` or `cleanKeySimpleCIWithSpecials()` functions.

```typescript
import {
  cleanKey,
  cleanKeyCI,
  cleanKeySimpleWithSpecials,
  cleanKeySimpleCIWithSpecials,
  cleanKeyWithSpecials,
  CharAllowanceMode,
} from "@plandek-utils/ts-clean-key";

cleanKey(" Re.|~:/move---Me "); // => "emove-e"

cleanKey(" Re.|~:/move---Me ", { mode: CharAllowanceMode.Specials }); // => "e.|~:/move-e"
cleanKeyWithSpecials(" Re.|~:/move---Me "); // => "e.|~:/move-e"

cleanKey(" Re.|~:/move---Me ", { caseSensitive: false, mode: CharAllowanceMode.Specials }); // => "Re.|~:/move-Me"
cleanKeyWithSpecials(" Re.|~:/move---Me ", { caseSensitive: false }); // => "Re.|~:/move-Me"
cleanKeyCI(" Re.|~:/move---Me ", { mode: CharAllowanceMode.Specials }); // => "Re.|~:/move-Me"

cleanKey(" Re.|~:/move---Me ", { replaceManyDashes: false, mode: CharAllowanceMode.Specials }); // => "e.|~:/move---e"
cleanKeyWithSpecials(" Re.|~:/move---Me ", { replaceManyDashes: false }); // => "e.|~:/move---e"
cleanKeySimpleWithSpecials(" Re.|~:/move---Me "); // => "e.|~:/move---e"

cleanKey(" Re.|~:/move---Me ", { caseSensitive: false, mode: CharAllowanceMode.Specials, replaceManyDashes: false }); // => "Re.|~:/move---Me"
cleanKeyWithSpecials(" Re.|~:/move---Me ", { caseSensitive: false, replaceManyDashes: false }); // => "Re.|~:/move---Me"
cleanKeyCI(" Re.|~:/move---Me ", { mode: CharAllowanceMode.Specials, replaceManyDashes: false }); // => "Re.|~:/move---Me"
cleanKeySimpleCIWithSpecials(" Re.|~:/move---Me "); // => "Re.|~:/move---Me"
```

## Breaking changes warning

### v3.x

Since v3.0 the `allowedDots` option was replaced with a `mode` option that can be `strict` (default), `dots`, or `specials`. The typescript `CharAllowanceMode` enum covers the possible modes.


### v2.x

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
