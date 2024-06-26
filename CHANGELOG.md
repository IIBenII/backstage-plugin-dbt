# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v2.1.0...v2.2.0) (2024-05-27)

### Features

- Allow json files to be at root level ([#257](https://github.com/IIBenII/backstage-plugin-dbt/issues/257)) ([84c141c](https://github.com/IIBenII/backstage-plugin-dbt/commit/84c141ca2b30a004d3e61fed896fa5ac2890b99a))

# [2.1.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v2.1.0-alpha.0...v2.1.0) (2024-05-17)

**Note:** Version bump only for package root

# [2.1.0-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v2.0.0...v2.1.0-alpha.0) (2024-05-17)

### Features

- Add dbtdoc-path annotation ([#244](https://github.com/IIBenII/backstage-plugin-dbt/issues/244)) ([33361e8](https://github.com/IIBenII/backstage-plugin-dbt/commit/33361e8300e1b51695111fcf4e4623dabf6ad8e8))

# [2.0.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v2.0.0-alpha.0...v2.0.0) (2024-05-16)

**Note:** Version bump only for package root

# [2.0.0-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v1.0.1-alpha.0...v2.0.0-alpha.0) (2024-05-16)

### Features

- Add suport for new backend system ([#242](https://github.com/IIBenII/backstage-plugin-dbt/issues/242)) ([bc0a89f](https://github.com/IIBenII/backstage-plugin-dbt/commit/bc0a89f7924c354e3f7888a667d264b96f3e83d3))

### BREAKING CHANGES

- Backend type S3 or Google Storage are now define in `app-config.yaml`. Read the `README.md` to check how to update from v1 to v2

## [1.0.1-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v1.0.0...v1.0.1-alpha.0) (2023-10-30)

**Note:** Version bump only for package root

# [1.0.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v1.0.0-alpha.1...v1.0.0) (2023-10-23)

**Note:** Version bump only for package root

# [1.0.0-alpha.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2023-10-16)

### Bug Fixes

- Changelog reference to right PR ([#177](https://github.com/IIBenII/backstage-plugin-dbt/issues/177)) ([ee4c8cb](https://github.com/IIBenII/backstage-plugin-dbt/commit/ee4c8cb601d3eccb9efdfa155f2d872081a6fd8e))

# [1.0.0-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.4-alpha.0...v1.0.0-alpha.0) (2023-10-16)

### Features

- add AWS S3 Support ([#176](https://github.com/IIBenII/backstage-plugin-dbt/pull/165)) ([4aebaeb](https://github.com/IIBenII/backstage-plugin-dbt/commit/4aebaebb8b1d9b4489e59ad5df9c2581c0282c7d))

### BREAKING CHANGES

- You need to import the storage provider when adding the pluging

```ts
// packages/backend/src/plugins/dbt.ts
import {
  createRouter,
  GoogleStorageProvider, #ADD THIS
} from "@iiben_orgii/backstage-plugin-dbt-backend";
import { Router } from "express";
import { PluginEnvironment } from "../types";

const storageProvider = new GoogleStorageProvider(); #ADD THIS

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    storageProvider: storageProvider, #ADD THIS
  });
}
```

## [0.3.4-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.3...v0.3.4-alpha.0) (2023-10-16)

**Note:** Version bump only for package root

## [0.3.3](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.3-alpha.0...v0.3.3) (2023-07-31)

**Note:** Version bump only for package root

## [0.3.3-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.2...v0.3.3-alpha.0) (2023-07-31)

**Note:** Version bump only for package root

## [0.3.2](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.2-alpha.0...v0.3.2) (2023-07-31)

**Note:** Version bump only for package root

## [0.3.2-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.1...v0.3.2-alpha.0) (2023-07-31)

### Bug Fixes

- Keep version synchronized between backend and front ([#109](https://github.com/IIBenII/backstage-plugin-dbt/issues/109)) ([05f4115](https://github.com/IIBenII/backstage-plugin-dbt/commit/05f4115780784145387273241ee89cdb8f2efd49))

## [0.3.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.0...v0.3.1) (2023-07-28)

### Bug Fixes

- isDBTAvailable not working when global bucket is set ([#108](https://github.com/IIBenII/backstage-plugin-dbt/issues/108)) ([41b428d](https://github.com/IIBenII/backstage-plugin-dbt/commit/41b428de39da31072254e70513f909bc7eae585f))

# [0.3.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.0-alpha.1...v0.3.0) (2023-07-28)

**Note:** Version bump only for package root

# [0.3.0-alpha.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.0-alpha.0...v0.3.0-alpha.1) (2023-07-28)

### Features

- improve global bucket setup ([#107](https://github.com/IIBenII/backstage-plugin-dbt/issues/107)) ([d7d42f5](https://github.com/IIBenII/backstage-plugin-dbt/commit/d7d42f530b5825c0ccf10dca8ef8338f75a7470c))

# [0.3.0-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2...v0.3.0-alpha.0) (2023-07-27)

### Features

- Add bucket definition in app-conf.yaml ([#106](https://github.com/IIBenII/backstage-plugin-dbt/issues/106)) ([45adc2a](https://github.com/IIBenII/backstage-plugin-dbt/commit/45adc2a8dd58273f1096295d2cafaab52821855b))

## [0.2.2](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2-alpha.2...v0.2.2) (2023-06-15)

**Note:** Version bump only for package root

## [0.2.2-alpha.2](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2-alpha.1...v0.2.2-alpha.2) (2023-06-15)

### Bug Fixes

- yarn.lock ([#79](https://github.com/IIBenII/backstage-plugin-dbt/issues/79)) ([068122d](https://github.com/IIBenII/backstage-plugin-dbt/commit/068122d970bb782a236a68f63bdac258c8607847))

## [0.2.2-alpha.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2-alpha.0...v0.2.2-alpha.1) (2023-06-15)

**Note:** Version bump only for package root

## [0.2.2-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.1...v0.2.2-alpha.0) (2023-06-15)

### Bug Fixes

- fix base url ([#69](https://github.com/IIBenII/backstage-plugin-dbt/issues/69)) ([c509995](https://github.com/IIBenII/backstage-plugin-dbt/commit/c50999550150472de6b69f868ff3e66b0fd97752))

### Reverts

- Revert "chore(deps-dev): bump lerna from 6.6.1 to 7.0.1 (#67)" (#76) ([f26a48f](https://github.com/IIBenII/backstage-plugin-dbt/commit/f26a48f44a56e4c4b8de25e5aaa787a72af17952)), closes [#67](https://github.com/IIBenII/backstage-plugin-dbt/issues/67) [#76](https://github.com/IIBenII/backstage-plugin-dbt/issues/76)

## [0.2.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.1-alpha.1...v0.2.1) (2023-04-27)

**Note:** Version bump only for package root

## [0.2.1-alpha.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.1-alpha.0...v0.2.1-alpha.1) (2023-04-27)

**Note:** Version bump only for package root

## [0.2.1-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.0...v0.2.1-alpha.0) (2023-04-27)

**Note:** Version bump only for package root

# [0.2.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.1.2...v0.2.0) (2023-04-26)

### Features

- add readme ([42ed633](https://github.com/IIBenII/backstage-plugin-dbt/commit/42ed63382710b1b7b7d6dc571ec136013b5e80e8))
