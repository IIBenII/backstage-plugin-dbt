import { rootRouteRef } from './routes';
import {
  createPlugin,
  createRoutableExtension,
  useApi,
  configApiRef,
} from '@backstage/core-plugin-api';


import { useEntity } from '@backstage/plugin-catalog-react';

export const isDBTAvailable = () => {
  const { entity } = useEntity();
  const config = useApi(configApiRef);
  if (entity.metadata.annotations?.["dbtdoc-bucket"] != null) {
    return true;
  }
  else if (config.getOptionalString('dbtdoc.bucket')) {
    return true;
  }
  else {
    return false;
  }
}

export const dbtPlugin = createPlugin({
  id: 'dbt',
  routes: {
    root: rootRouteRef,
  },
});



export const DbtPage = dbtPlugin.provide(
  createRoutableExtension({
    name: 'DbtPage',
    component: () =>
      import('./components/DbtComponent').then(m => m.DbtComponent),
    mountPoint: rootRouteRef,
  }),
);
