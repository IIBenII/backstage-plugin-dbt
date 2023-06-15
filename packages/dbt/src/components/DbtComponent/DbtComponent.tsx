import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Page,
  Content,
  Progress,
  ResponseErrorPanel
} from '@backstage/core-components';

import { fetchApiRef, useApi, configApiRef } from '@backstage/core-plugin-api';
import useAsync from 'react-use/lib/useAsync';
import { useEntity } from '@backstage/plugin-catalog-react';

import { ModelstableComponent, TeststableComponent, Manifest, Catalog } from '../DbtFetchComponent';

function getManifest(): { manifest: Manifest, manifest_loading: boolean, manifest_error: string } {
  const { entity } = useEntity();
  const { fetch } = useApi(fetchApiRef);

  const config = useApi(configApiRef);
  const base_url = config.get('backend.baseUrl');

  const { value, loading, error } = useAsync(async (): Promise<Manifest> => {
    const response = await fetch(
      `${base_url}/api/dbt/manifest/${entity.metadata.annotations?.["dbtdoc-bucket"]}/${entity.kind}/${entity.metadata.name}`
    );
    const data = await response.json();
    return data;
  }, []);

  const manifest = value;
  const manifest_loading = loading;
  const manifest_error = error;

  // @ts-ignore
  return { manifest, manifest_loading, manifest_error }
}

function getCatalog(): { catalog: Catalog, catalog_loading: boolean, catalog_error: string } {
  const { entity } = useEntity();
  const { fetch } = useApi(fetchApiRef);

  const config = useApi(configApiRef);
  const base_url = config.get('backend.baseUrl');

  const { value, loading, error } = useAsync(async (): Promise<Catalog> => {
    const response = await fetch(
      `${base_url}/api/dbt/catalog/${entity.metadata.annotations?.["dbtdoc-bucket"]}/${entity.kind}/${entity.metadata.name}`
    );
    const data = await response.json();
    return data;
  }, []);


  const catalog = value;
  const catalog_loading = loading;
  const catalog_error = error;

  // @ts-ignore
  return { catalog, catalog_loading, catalog_error }
}

export const DbtComponent = () => {

  const { catalog, catalog_loading, catalog_error } = getCatalog();

  const { manifest, manifest_loading, manifest_error } = getManifest();

  console.log(manifest)

  if (manifest_loading || catalog_loading) {
    return <Progress />;
  } else if (manifest_error) {
    // @ts-ignore
    return <ResponseErrorPanel error={manifest_error} />;
  } else if (catalog_error) {
    // @ts-ignore
    return <ResponseErrorPanel error={catalog_error} />;
  }

  return (
    <Page themeId="tool">
      <Content>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <ModelstableComponent manifest={manifest} catalog={catalog} />
          </Grid>
          <Grid item>
            <TeststableComponent manifest={manifest} catalog={catalog} />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
}
