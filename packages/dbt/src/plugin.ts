import { rootRouteRef } from './routes';
import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { useEntity } from '@backstage/plugin-catalog-react';

export const isDBTAvailable = () => {
  const { entity } = useEntity();
  return Boolean(entity.metadata.annotations?.["dbtdoc-bucket"]);
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
