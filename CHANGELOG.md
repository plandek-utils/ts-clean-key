# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.0.0](https://github.com/plandek-utils/time-utils/compare/v5.0.0...v6.0.0) (2024-11-06)


### ⚠ BREAKING CHANGES

* dependencies replacement might end up with some edge cases

### Features

* refactor and changes in dependencies ([c34245f](https://github.com/plandek-utils/time-utils/commit/c34245f0036b006db1b5603e36b4b8ec26b4d56a))

## [5.0.0](https://github.com/plandek-utils/ts-clean-key/compare/v4.5.0...v5.0.0) (2022-11-23)


### ⚠ BREAKING CHANGES

* The hashtag character was always stripped out, but now it is considered safe under
the special mode

### Features

* special mode includes hashtag character ([44db303](https://github.com/plandek-utils/ts-clean-key/commit/44db303b1effd9921cb9f8f1fdcd40f625a5fbdf))

## [4.5.0](https://github.com/plandek-utils/ts-clean-key/compare/v4.4.0...v4.5.0) (2022-09-07)


### Features

* safeKeyToOriginal function, inverse of processedSafeKey ([f7fab30](https://github.com/plandek-utils/ts-clean-key/commit/f7fab30c3d08e67658b8f0fad7b49f77b73457bc))

## [4.4.0](https://github.com/plandek-utils/ts-clean-key/compare/v4.2.2...v4.4.0) (2022-02-28)


### Features

* option to trimEdgeDashes ([c3f5a0b](https://github.com/plandek-utils/ts-clean-key/commit/c3f5a0b6cc9adf822d04710c9a73107ec757b2e6))

## [4.3.0](https://github.com/plandek-utils/ts-clean-key/compare/v4.2.2...v4.3.0) (2022-02-28)


### Features

* option to trimEdgeDashes ([c3f5a0b](https://github.com/plandek-utils/ts-clean-key/commit/c3f5a0b6cc9adf822d04710c9a73107ec757b2e6))

### [4.2.2](https://github.com/plandek-utils/ts-clean-key/compare/v4.2.1...v4.2.2) (2022-02-25)

### [4.2.1](https://github.com/plandek-utils/ts-clean-key/compare/v4.2.0...v4.2.1) (2022-02-25)

## [4.2.0](https://github.com/plandek-utils/ts-clean-key/compare/v4.1.0...v4.2.0) (2022-02-25)


### Features

* `parameterizeAndClean()` and `prependIfNoLetters` option ([6d5e471](https://github.com/plandek-utils/ts-clean-key/commit/6d5e471a9359a2735477a04ee67f4eb9c7f0cba8))

## [4.1.0](https://github.com/plandek-utils/ts-clean-key/compare/v4.0.0...v4.1.0) (2022-01-14)


### Features

* adding `processedSafeKey()` which will swap any "unsafe" char with a unicode code string ([3a65520](https://github.com/plandek-utils/ts-clean-key/commit/3a655209b9743ba0e8d0cd1c5770851d45b89c73))

## [4.0.0](https://github.com/plandek-utils/ts-clean-key/compare/v3.0.0...v4.0.0) (2021-02-16)


### ⚠ BREAKING CHANGES

* added `~` to specials

### Features

* added `~` to specials ([1691abb](https://github.com/plandek-utils/ts-clean-key/commit/1691abb19a6bfa38d950fc506036c8dfac57d027))

## [3.0.0](https://github.com/plandek-utils/ts-clean-key/compare/v2.2.1...v3.0.0) (2021-02-16)


### ⚠ BREAKING CHANGES

* `allowDots` options is replaced with the `mode` option.

### Features

* replace `allowDots` option with a `mode` option ([5f3e428](https://github.com/plandek-utils/ts-clean-key/commit/5f3e428b6a7d0353469557d2b264523b875c8a64))

### [2.2.1](https://github.com/plandek-utils/ts-clean-key/compare/v2.2.0...v2.2.1) (2021-02-05)

## [2.2.0](https://github.com/plandek-utils/ts-clean-key/compare/v2.1.0...v2.2.0) (2020-05-28)


### Features

* allowDots option and functions ([daf5b3f](https://github.com/plandek-utils/ts-clean-key/commit/daf5b3fbc44466c7cbce6bd0fcc93c6059b63e70))

## [2.1.0](https://github.com/plandek-utils/ts-clean-key/compare/v2.0.0...v2.1.0) (2020-05-27)


### Features

* add case insensitive options ([ae8caf4](https://github.com/plandek-utils/ts-clean-key/commit/ae8caf4dbb6f2602c69dcecce429e6adb0c114bb))

## [2.0.0](https://github.com/plandek-utils/ts-clean-key/compare/v1.1.0...v2.0.0) (2020-05-27)


### ⚠ BREAKING CHANGES

* Since v2.0 the `cleanKey` is not the default export. Instead both `cleanKey` and
`cleanKeySimple` are named exports.

### Features

* add `cleanKeySimple` + replace default export for named exports ([d618588](https://github.com/plandek-utils/ts-clean-key/commit/d6185885d915485246aacfb2d4158f8ca1afe22e))

## [1.1.0](https://github.com/plandek-utils/ts-clean-key/compare/v1.0.2...v1.1.0) (2020-05-27)


### Features

* optionally disable replacing multiple dashes for a single one ([57d7a11](https://github.com/plandek-utils/ts-clean-key/commit/57d7a114eb8f895205e69bde0fc70521ad51d0c3))

### [1.0.2](https://github.com/plandek-utils/ts-clean-key/compare/v1.0.1...v1.0.2) (2020-05-12)


### Bug Fixes

* target ES2017 instead of esnext for module, and ES2015 for main ([cda48b5](https://github.com/plandek-utils/ts-clean-key/commit/cda48b5958bb45ae6730cf22f03840a28c1024d7))

### [1.0.1](https://github.com/plandek-utils/ts-clean-key/compare/v1.0.0...v1.0.1) (2020-04-14)

## 1.0.0 (2019-10-23)


### Features

* initial cleanKey() implementation ([63d528c](https://github.com/plandek-utils/ts-clean-key/commit/63d528ca73a6c9970784b2d2014f06eb51dd459a))
