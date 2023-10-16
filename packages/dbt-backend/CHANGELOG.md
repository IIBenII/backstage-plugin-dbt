# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-alpha.0](https://github.com/IIBenII/backstage-plugin-dbt/compare/v0.3.4-alpha.0...v1.0.0-alpha.0) (2023-10-16)


### Features

* add AWS S3 Support ([#176](https://github.com/IIBenII/backstage-plugin-dbt/issues/176)) ([1e5a9d9](https://github.com/IIBenII/backstage-plugin-dbt/commit/1e5a9d996b1bd15e0fec08d88571e3bbda70a420))


### BREAKING CHANGES

* You need to import the storage provider when adding the pluging

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
