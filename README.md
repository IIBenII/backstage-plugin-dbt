<h1 align="center">Backstage Plugin dbt</h1>

> [Backstage](https://backstage.io/) plugins to view [dbt doc](https://www.getdbt.com/product/data-documentation/).

![npm (scoped)](https://img.shields.io/npm/v/@iiben_orgii/backstage-plugin-dbt-backend)
![latest workflow pr](https://github.com/IIBenII/backstage-plugin-dbt/actions/workflows/pr-build-test.yml/badge.svg)
![latest workflow release](https://github.com/IIBenII/backstage-plugin-dbt/actions/workflows/pre-release.yml/badge.svg)
![latest workflow prerelease](https://github.com/IIBenII/backstage-plugin-dbt/actions/workflows/release.yml/badge.svg)
![Servier Inspired](https://raw.githubusercontent.com/servierhub/.github/main/badges/inspired.svg)

## Table of contents

<!-- toc -->

- [Features](#features)
- [Limitations](#limitations)
- [Screenshots](#screenshots)
- [Setup](#setup)
  - [Legacy backend system](#legacy-backend-system)
  - [New backend system](#new-backend-system)
- [Usage](#usage)
- [Update from v1 to v2](#update-from-v1-to-v2)

## Features

- List all dbt models and tests
- Get details on dbt models and tests like:
  - Documentations
  - Stats
  - Columns
  - Dependency graph
  - Code source (raw and compiled)

## Limitations

As of now, the plugin only support the following backends:

- [x] Google Cloud Storage
- [x] AWS S3
- [ ] Azure Blob Storage

## Screenshots

Landing page:
![Landing page](doc/landing.png)

Model details:
![](doc/model_details_1.png)
![](doc/model_details_dependency.png)
![](doc/model_details_code.png)

Test details:
![](doc/test_details.png)

Note: catalog and manifest come from [https://github.com/fivetran/dbt_shopify/tree/main](https://github.com/fivetran/dbt_shopify/tree/main)

## Setup

1. Install packages:

```bash
# From your Backstage root directory
yarn --cwd packages/app add @iiben_orgii/backstage-plugin-dbt
yarn --cwd packages/backend add @iiben_orgii/backstage-plugin-dbt-backend
```

2. Add a new dbt tab to the entity page.

`packages/app/src/components/catalog/EntityPage.tsx`

```tsx
// packages/app/src/components/catalog/EntityPage.tsx

import { DbtPage, isDBTAvailable } from "@iiben_orgii/backstage-plugin-dbt";

// Farther down at the serviceEntityPage declaration
const serviceEntityPage = (
  <EntityLayout>
    {/* Place the following section where you want the tab to appear */}
    <EntityLayout.Route if={isDBTAvailable} path="/dbt" title="dbt">
      <DbtPage />
    </EntityLayout.Route>
  </EntityLayout>
);
```

### Legacy backend system

1. Add the `dbt` route by creating the file `packages/backend/src/plugins/dbt.ts`:

`packages/backend/src/plugins/dbt.ts`

```ts
import {
  createRouter,
} from "@iiben_orgii/backstage-plugin-dbt-backend";

import { Router } from "express";
import { PluginEnvironment } from "../types";

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    config: env.config,
  });
}
```

then you have to add the route as follows:

`packages/backend/src/index.ts`

```ts
// packages/backend/src/index.ts
import dbt from "./plugins/dbt";

async function main() {
  //...
  const dbtEnv = useHotMemoize(module, () => createEnv("dbt"));
  //...
  apiRouter.use("/dbt", await dbt(dbtEnv));
  //...
}
```

### New backend system

In the file: `packages/backend/src/index.ts`

```ts
import { dbtPlugin } from '@iiben_orgii/backstage-plugin-dbt-backend';

//[...]

const backend = createBackend();
//[...]

backend.add(dbtPlugin);

//[...]
backend.start();
```

## Usage

### Single bucket model

You can define one bucket with all your manifest and catalog files.

Add a file `application/packages/app/config.d.ts`:

```ts
export interface Config {
  dbtdoc: {
    /**
     * Frontend root URL
     * @visibility frontend
     */
    bucket: string;
  };
}
```

Update the file `application/packages/app/package.json` with

```json
  "files": [
    "dist",
    "config.d.ts"
  ],
  "configSchema": "config.d.ts"
```

Then you can add to your `app-config.yaml`:

```yaml
dbtdoc:
  bucket: your-bucket-123
  backend: GoogleStorage # or S3
```

### One bucket for each application or overwrite the global config

*Limitation: all dbt docs must be saved on same backend type (GoogleStorage or S3)*

Add `dbtdoc-bucket` as annotation in `catalog-info.yaml`. Optionally, add the `dbtdoc-path` annotation if your GCS bucket structure does not conform to the expected structure.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
spec:
  type: service
  owner: user:guest
  lifecycle: experimental
metadata:
  name: "test"
  annotations:
    dbtdoc-bucket: "my-bucket"
    dbtdoc-path: "optional/override/path" # Optional
```

Then you can add to your `app-config.yaml`:

```yaml
dbtdoc:
  backend: GoogleStorage # or S3
```

### Files path in the bucket

**Following path must be respect regardless your bucket setup (single or multi).**

If using the multi setup, you can override the `{kind}/{name}` portion of the path using the `dbtdoc-path` annotation.

You can upload your `manifest.json` and `catalog.json` to a GCS Bucket as follow:

- `{dbtdoc-bucket}/{kind}/{name}/manifest.json`
- `{dbtdoc-bucket}/{kind}/{name}/catalog.json`

### Authentication

For authentification to GCS Bucket, the plugin use ADC credentials [https://cloud.google.com/docs/authentication/provide-credentials-adc](https://cloud.google.com/docs/authentication/provide-credentials-adc).

## Update from v1 to v2

Update the `app-config.yaml` as follow:

```yaml
dbtdoc:
  bucket: your-bucket-123
  backend: GoogleStorage
```

or 

```yaml
dbtdoc:
  bucket: your-bucket-123
  backend: S3
```

**Apply the following changes only if you use the old backend system.**

In v1: `packages/backend/src/plugins/dbt.ts`

```ts
// packages/backend/src/plugins/dbt.ts
import {
  createRouter,
  GoogleStorageProvider,
} from "@iiben_orgii/backstage-plugin-dbt-backend";
import { Router } from "express";
import { PluginEnvironment } from "../types";

const storageProvider = new GoogleStorageProvider();

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    storageProvider: storageProvider,
  });
}
```

In v2: `packages/backend/src/plugins/dbt.ts`

```ts
// packages/backend/src/plugins/dbt.ts
import {
  createRouter,
} from "@iiben_orgii/backstage-plugin-dbt-backend";

import { Router } from "express";
import { PluginEnvironment } from "../types";

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    config: env.config,
  });
}
```