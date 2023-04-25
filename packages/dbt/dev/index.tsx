import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { dbtPlugin, DbtPage } from '../src/plugin';

createDevApp()
  .registerPlugin(dbtPlugin)
  .addPage({
    element: <DbtPage />,
    title: 'Root Page',
    path: '/dbt'
  })
  .render();
