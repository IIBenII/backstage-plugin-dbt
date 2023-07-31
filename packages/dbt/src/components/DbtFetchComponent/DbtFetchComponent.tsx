import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Table, TableColumn, InfoCard, CardTab, TabbedCard, CodeSnippet, DependencyGraph, DependencyGraphTypes } from '@backstage/core-components';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { MarkdownContent } from '@backstage/core-components';
import Typography from '@material-ui/core/Typography';
import { DenseTableColumns, DepGraphType, toggleDrawerCustom, ModelsTableType, Column, Node, Stats, DenseTableStatsSchema } from './interfaces'

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '50%',
      justifyContent: 'space-between',
      padding: theme.spacing(2.5),
    },
  }),
);

const useDrawerContentStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icon: {
      fontSize: 20,
    },
    content: {
      height: '80%',
      backgroundColor: '#EEEEEE',
    },
    secondaryAction: {
      marginLeft: theme.spacing(2.5),
    },
    card: {
      width: '100%',
    }
  }),
);

export const DenseTableC = ({ columns }: DenseTableColumns) => {
  const data_columns: TableColumn[] = [
    { title: 'Index', field: 'index' },
    { title: 'Name', field: 'name' },
    { title: 'Type', field: 'type' },
    { title: 'Comment', field: 'comment' },
  ];

  let data = []

  for (let key in columns) {
    data.push(columns[key])
  }

  return (
    <Table
      title="Columns"
      options={{ search: true, paging: false, padding: 'dense' }}
      columns={data_columns}
      data={data}
    />
  );
}

export const DenseTableStats = ({ stats }: DenseTableStatsSchema) => {
  const data_columns: TableColumn[] = [
    { title: 'Label', field: 'label' },
    { title: 'Value', field: 'value' },
    { title: 'Description', field: 'description' },
  ];

  let data = []

  for (let key in stats) {
    data.push(stats[key])
  }

  return (
    <Table
      title="Stats"
      options={{ search: true, paging: false, padding: 'dense' }}
      columns={data_columns}
      data={data}
    />
  );
}



export const DepGraph = ({ parent, child, model_name }: DepGraphType) => {

  const dep_nodes = [
    { id: model_name },
  ];
  const dep_edges = [];

  for (let p in parent) {
    // @ts-ignore
    dep_nodes.push({ id: parent[p] })
    dep_edges.push({ from: parent[p], to: model_name })
  }
  for (let p in child) {
    // @ts-ignore
    dep_nodes.push({ id: child[p] })
    dep_edges.push({ to: child[p], from: model_name })
  }


  return (
    <DependencyGraph
      nodes={dep_nodes}
      // @ts-ignore
      edges={dep_edges}
      direction={DependencyGraphTypes.Direction.LEFT_RIGHT}
    />
  );
}


const DrawerContent = ({
  // @ts-ignore
  toggleDrawer,
  manifest,
  catalog,
  selected_node
}: toggleDrawerCustom
) => {

  const classes = useDrawerContentStyles();

  if (manifest.parent_map === undefined || manifest.child_map === undefined || catalog.nodes === undefined) {
    return (<></>)
  }
  const parent = manifest.parent_map[selected_node.unique_id]
  const child = manifest.child_map[selected_node.unique_id]

  let model_columns: Column[];
  let model_stats: Stats[];
  // @ts-ignore
  if (catalog.nodes[selected_node.unique_id] === undefined || catalog.nodes[selected_node.unique_id].length == 0) {
    model_columns = []
    model_stats = []
  } else {
    model_columns = catalog.nodes[selected_node.unique_id].columns
    // @ts-ignore
    model_stats = catalog.nodes[selected_node.unique_id].stats
  }

  return (
    <>
      <Grid container justifyContent="center" spacing={6}>
        <Grid container item xs={12} alignItems="center" direction="row">
          <div className={classes.header}>
            <Typography variant="h5">{selected_node.unique_id}</Typography>
          </div>
        </Grid>
        <Grid container item xs={12} alignItems="center" direction="row">
          <InfoCard className={classes.card} title="Description">
            <MarkdownContent content={selected_node.description} dialect="common-mark" />
          </InfoCard>
        </Grid>

        <Grid container item xs={12} alignItems="center" direction="row">
          <InfoCard className={classes.card}>
            <DenseTableStats stats={model_stats || []} />
          </InfoCard>
        </Grid>

        <Grid container item xs={12} alignItems="center" direction="row">
          <InfoCard className={classes.card}>
            <DenseTableC columns={model_columns || []} />
          </InfoCard>
        </Grid>
        <Grid container item xs={12} alignItems="center" direction="row">
          <InfoCard className={classes.card} title="Dependency graph">
            <DepGraph parent={parent || []} child={child || []} model_name={selected_node.unique_id || ""} />
          </InfoCard>
        </Grid>
        <Grid container item xs={12} alignItems="center" direction="row" >
          <TabbedCard title="Code">
            <CardTab label="Source">
              <CodeSnippet text={selected_node.raw_code} language="sql" showLineNumbers />
            </CardTab>
            <CardTab label="Compiled">
              <CodeSnippet text={selected_node.compiled_code} language="sql" showLineNumbers />
            </CardTab>

          </TabbedCard>
        </Grid>
      </Grid>
    </>
  );
};

let selected_node: Node;

export const ModelsTable = ({ manifest, catalog }: ModelsTableType) => {

  const [isOpen, toggleDrawer] = useState(false);
  const classes = useDrawerStyles();

  const columns: TableColumn[] = [
    { title: 'Package name', field: 'package_name' },
    { title: 'Name', field: 'name' },
    { title: 'Open', field: 'open' },
  ];

  let models = []
  for (let key in manifest.nodes) {
    if (manifest.nodes[key].resource_type === "model") {
      models.push(manifest.nodes[key])
    }
  }

  const data = models.map(node => {
    return {
      name: node.name,
      package_name: node.package_name,
      open: (<Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          selected_node = node;
          toggleDrawer(true);
        }}
      >
        Details
      </Button>),
    };
  });

  return (
    <>
      <Table
        title="Models:"
        options={{ search: true, paging: true, padding: 'dense', pageSize: 20 }}
        columns={columns}
        data={data}
      />
      <Drawer
        classes={{
          paper: classes.paper,
        }}
        anchor="right"
        open={isOpen}
        onClose={() => toggleDrawer(false)}
      >
        <DrawerContent toggleDrawer={toggleDrawer} manifest={manifest} catalog={catalog} selected_node={selected_node} />
      </Drawer>
    </>
  );
};

export const TestsTable = ({ manifest, catalog }: ModelsTableType) => {

  const [isOpen, toggleDrawer] = useState(false);
  const classes = useDrawerStyles();

  const columns: TableColumn[] = [
    { title: 'Package name', field: 'package_name' },
    { title: 'Name', field: 'name' },
    { title: 'Open', field: 'open' },
  ];

  let tests = []
  for (let key in manifest.nodes) {
    if (manifest.nodes[key].resource_type === "test") {
      tests.push(manifest.nodes[key])
    }
  }

  const data = tests.map(node => {
    return {
      name: node.name,
      package_name: node.package_name,
      open: (<Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          selected_node = node;
          toggleDrawer(true);
        }}
      >
        Details
      </Button>),
    };
  });

  return (
    <>
      <Table
        title="Tests:"
        options={{ search: true, paging: true, padding: 'dense', pageSize: 20 }}
        columns={columns}
        data={data}
      />
      <Drawer
        classes={{
          paper: classes.paper,
        }}
        anchor="right"
        open={isOpen}
        onClose={() => toggleDrawer(false)}
      >
        <DrawerContent toggleDrawer={toggleDrawer} manifest={manifest} catalog={catalog} selected_node={selected_node} />
      </Drawer>
    </>
  );
};


export const ModelstableComponent = ({ manifest, catalog }: ModelsTableType) => {
  return (
    <>
      <ModelsTable manifest={manifest} catalog={catalog} />
    </>
  );
};

export const TeststableComponent = ({ manifest, catalog }: ModelsTableType) => {
  return (
    <>
      <TestsTable manifest={manifest} catalog={catalog} />
    </>
  );
};
