# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v2.0.0-alpha.0...v2.0.0) (2024-05-16)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

# [2.0.0-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v1.0.1-alpha.0...v2.0.0-alpha.0) (2024-05-16)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [1.0.1-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v1.0.0...v1.0.1-alpha.0) (2023-10-30)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

# [1.0.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v1.0.0-alpha.1...v1.0.0) (2023-10-23)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

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

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [0.3.3](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.3-alpha.0...v0.3.3) (2023-07-31)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [0.3.3-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.2...v0.3.3-alpha.0) (2023-07-31)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [0.3.2](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.2-alpha.0...v0.3.2) (2023-07-31)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [0.3.2-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.1...v0.3.2-alpha.0) (2023-07-31)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [0.3.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.0...v0.3.1) (2023-07-28)

### Bug Fixes

- isDBTAvailable not working when global bucket is set ([#108](https://github.com/IIBenII/backstage-plugin-dbt/issues/108)) ([41b428d](https://github.com/IIBenII/backstage-plugin-dbt/commit/41b428de39da31072254e70513f909bc7eae585f))

# [0.3.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.0-alpha.1...v0.3.0) (2023-07-28)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

# [0.3.0-alpha.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.0-alpha.0...v0.3.0-alpha.1) (2023-07-28)

### Features

- improve global bucket setup ([#107](https://github.com/IIBenII/backstage-plugin-dbt/issues/107)) ([d7d42f5](https://github.com/IIBenII/backstage-plugin-dbt/commit/d7d42f530b5825c0ccf10dca8ef8338f75a7470c))

# [0.3.0-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2...v0.3.0-alpha.0) (2023-07-27)

### Features

- Add bucket definition in app-conf.yaml ([#106](https://github.com/IIBenII/backstage-plugin-dbt/issues/106)) ([45adc2a](https://github.com/IIBenII/backstage-plugin-dbt/commit/45adc2a8dd58273f1096295d2cafaab52821855b))

## [0.2.2](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2-alpha.2...v0.2.2) (2023-06-15)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [0.2.2-alpha.2](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2-alpha.1...v0.2.2-alpha.2) (2023-06-15)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [0.2.2-alpha.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2-alpha.0...v0.2.2-alpha.1) (2023-06-15)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [0.2.2-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.1...v0.2.2-alpha.0) (2023-06-15)

### Bug Fixes

- fix base url ([#69](https://github.com/IIBenII/backstage-plugin-dbt/issues/69)) ([c509995](https://github.com/IIBenII/backstage-plugin-dbt/commit/c50999550150472de6b69f868ff3e66b0fd97752))

## [0.2.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.1-alpha.1...v0.2.1) (2023-04-27)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [0.2.1-alpha.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.1-alpha.0...v0.2.1-alpha.1) (2023-04-27)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

## [0.2.1-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.0...v0.2.1-alpha.0) (2023-04-27)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt

# [0.2.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.1.2...v0.2.0) (2023-04-26)

### Features

- add readme ([42ed633](https://github.com/IIBenII/backstage-plugin-dbt/commit/42ed63382710b1b7b7d6dc571ec136013b5e80e8))
