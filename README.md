<h1 align="center">Backstage Plugin DBT</h1>

## Table of contents

<!-- toc -->

-   [Limitations](#limitations)
-   [Setup](#setup)
-   [Usage](#usage)

## Limitations

**This version only support Google Cloud Storage as backend to store `manifest.json`
and `catalog.json` files.**

## Setup

1. Install packages:

```bash
# From your Backstage root directory
yarn --cwd packages/app add @iiben_orgii/backstage-plugin-dbt
yarn --cwd packages/backend add @iiben_orgii/backstage-plugin-dbt-backend
```

2. Add a new DBT tab to the entity page.

`packages/app/src/components/catalog/EntityPage.tsx`

```tsx
// packages/app/src/components/catalog/EntityPage.tsx

import { DbtPage, isDBTAvailable } from "@iiben_orgii/backstage-plugin-dbt"

// Farther down at the serviceEntityPage declaration
const serviceEntityPage = (
    <EntityLayout>
        {/* Place the following section where you want the tab to appear */}
        <EntityLayout.Route if={isDBTAvailable} path="/dbt" title="DBT">
            <DbtPage />
        </EntityLayout.Route>
    </EntityLayout>
);
```

6. Add the `dbt` route by creating the file `packages/backend/src/plugins/dbt.ts`:

`packages/backend/src/plugins/dbt.ts`

```ts
// packages/backend/src/plugins/dbt.ts
import { createRouter } from '@iiben_orgii/backstage-plugin-dbt-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
  });
}
```

then you have to add the route as follows:

`packages/backend/src/index.ts`

```ts
// packages/backend/src/index.ts
import dbt from './plugins/dbt';

async function main() {
    //...
    const dbtEnv = useHotMemoize(module, () => createEnv('dbt'));
    //...
    apiRouter.use('/dbt', await dbt(dbtEnv));
    //...
}
```

## Usage

Add `dbtdoc-bucket` as annotation in `catalog-info.yaml`:

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
```

You can upload your `manifest.json` and `catalog.json` to a GCS Bucket as follow:
- `{dbtdoc-bucket}/{kind}/{name}/manifest.json`
- `{dbtdoc-bucket}/{kind}/{name}/catalog.json`

For authentification to GCS Bucket, the plugin use ADC credentials [https://cloud.google.com/docs/authentication/provide-credentials-adc](https://cloud.google.com/docs/authentication/provide-credentials-adc).