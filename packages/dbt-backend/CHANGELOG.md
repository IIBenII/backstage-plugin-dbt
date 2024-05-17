# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v2.0.0...v2.1.0-alpha.0) (2024-05-17)

### Features

- Add dbtdoc-path annotation ([#244](https://github.com/IIBenII/backstage-plugin-dbt/issues/244)) ([33361e8](https://github.com/IIBenII/backstage-plugin-dbt/commit/33361e8300e1b51695111fcf4e4623dabf6ad8e8))

# [2.0.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v2.0.0-alpha.0...v2.0.0) (2024-05-16)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

# [2.0.0-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v1.0.1-alpha.0...v2.0.0-alpha.0) (2024-05-16)

### Features

- Add suport for new backend system ([#242](https://github.com/IIBenII/backstage-plugin-dbt/issues/242)) ([bc0a89f](https://github.com/IIBenII/backstage-plugin-dbt/commit/bc0a89f7924c354e3f7888a667d264b96f3e83d3))

### BREAKING CHANGES

- Backend type S3 or Google Storage are now define in `app-config.yaml`. Read the `README.md` to check how to update from v1 to v2

## [1.0.1-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v1.0.0...v1.0.1-alpha.0) (2023-10-30)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

# [1.0.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v1.0.0-alpha.1...v1.0.0) (2023-10-23)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

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

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.3.3](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.3-alpha.0...v0.3.3) (2023-07-31)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.3.3-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.2...v0.3.3-alpha.0) (2023-07-31)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.3.2](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.2-alpha.0...v0.3.2) (2023-07-31)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.3.2-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.1...v0.3.2-alpha.0) (2023-07-31)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

# [0.3.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.0-alpha.1...v0.3.0) (2023-07-28)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

# [0.3.0-alpha.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.0-alpha.0...v0.3.0-alpha.1) (2023-07-28)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

# [0.3.0-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2...v0.3.0-alpha.0) (2023-07-27)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.2.2](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2-alpha.2...v0.2.2) (2023-06-15)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.2.2-alpha.2](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2-alpha.1...v0.2.2-alpha.2) (2023-06-15)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.2.2-alpha.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.2-alpha.0...v0.2.2-alpha.1) (2023-06-15)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.2.2-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.1...v0.2.2-alpha.0) (2023-06-15)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.2.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.1-alpha.1...v0.2.1) (2023-04-27)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.2.1-alpha.1](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.1-alpha.0...v0.2.1-alpha.1) (2023-04-27)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

## [0.2.1-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.2.0...v0.2.1-alpha.0) (2023-04-27)

**Note:** Version bump only for package @iiben_orgii/backstage-plugin-dbt-backend

# [0.2.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.1.2...v0.2.0) (2023-04-26)

### Features

- add readme ([42ed633](https://github.com/IIBenII/backstage-plugin-dbt/commit/42ed63382710b1b7b7d6dc571ec136013b5e80e8))
