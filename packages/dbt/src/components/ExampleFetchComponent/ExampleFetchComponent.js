import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Table, InfoCard, CardTab, TabbedCard, CodeSnippet, DependencyGraph, DependencyGraphTypes } from '@backstage/core-components';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { MarkdownContent } from '@backstage/core-components';
import Typography from '@material-ui/core/Typography';
const useDrawerStyles = makeStyles((theme) => createStyles({
    paper: {
        width: '50%',
        justifyContent: 'space-between',
        padding: theme.spacing(2.5),
    },
}));
const useDrawerContentStyles = makeStyles((theme) => createStyles({
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
}));
export const DenseTableC = ({ columns }) => {
    const data_columns = [
        { title: 'Index', field: 'index' },
        { title: 'Name', field: 'name' },
        { title: 'Type', field: 'type' },
        { title: 'Comment', field: 'comment' },
    ];
    let data = [];
    for (let key in columns) {
        data.push(columns[key]);
    }
    return (React.createElement(Table, { title: "Columns", options: { search: true, paging: false, padding: 'dense' }, columns: data_columns, data: data }));
};
export const DenseTableStats = ({ stats }) => {
    const data_columns = [
        { title: 'Label', field: 'label' },
        { title: 'Value', field: 'value' },
        { title: 'Description', field: 'description' },
    ];
    let data = [];
    for (let key in stats) {
        data.push(stats[key]);
    }
    return (React.createElement(Table, { title: "Stats", options: { search: true, paging: false, padding: 'dense' }, columns: data_columns, data: data }));
};
export const DepGraph = ({ parent, child, model_name }) => {
    const dep_nodes = [
        { id: model_name },
    ];
    const dep_edges = [];
    for (let p in parent) {
        // @ts-ignore
        dep_nodes.push({ id: parent[p] });
        dep_edges.push({ from: parent[p], to: model_name });
    }
    for (let p in child) {
        // @ts-ignore
        dep_nodes.push({ id: child[p] });
        dep_edges.push({ to: child[p], from: model_name });
    }
    return (React.createElement(DependencyGraph, { nodes: dep_nodes, 
        // @ts-ignore
        edges: dep_edges, direction: DependencyGraphTypes.Direction.LEFT_RIGHT }));
};
const DrawerContent = ({ 
// @ts-ignore
toggleDrawer, manifest, catalog, selected_node }) => {
    const classes = useDrawerContentStyles();
    const parent = manifest.parent_map[selected_node.unique_id];
    const child = manifest.child_map[selected_node.unique_id];
    let model_columns;
    let model_stats;
    // @ts-ignore
    if (catalog.nodes[selected_node.unique_id] === undefined || catalog.nodes[selected_node.unique_id].length == 0) {
        model_columns = [];
        model_stats = [];
    }
    else {
        model_columns = catalog.nodes[selected_node.unique_id].columns;
        // @ts-ignore
        model_stats = catalog.nodes[selected_node.unique_id].stats;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Grid, { container: true, justifyContent: "center", spacing: 6 },
            React.createElement(Grid, { container: true, item: true, xs: 12, alignItems: "center", direction: "row" },
                React.createElement("div", { className: classes.header },
                    React.createElement(Typography, { variant: "h5" }, selected_node.unique_id))),
            React.createElement(Grid, { container: true, item: true, xs: 12, alignItems: "center", direction: "row" },
                React.createElement(InfoCard, { className: classes.card, title: "Description" },
                    React.createElement(MarkdownContent, { content: selected_node.description, dialect: "common-mark" }))),
            React.createElement(Grid, { container: true, item: true, xs: 12, alignItems: "center", direction: "row" },
                React.createElement(InfoCard, { className: classes.card },
                    React.createElement(DenseTableStats, { stats: model_stats || [] }))),
            React.createElement(Grid, { container: true, item: true, xs: 12, alignItems: "center", direction: "row" },
                React.createElement(InfoCard, { className: classes.card },
                    React.createElement(DenseTableC, { columns: model_columns || [] }))),
            React.createElement(Grid, { container: true, item: true, xs: 12, alignItems: "center", direction: "row" },
                React.createElement(InfoCard, { className: classes.card, title: "Dependency graph" },
                    React.createElement(DepGraph, { parent: parent || [], child: child || [], model_name: selected_node.unique_id || "" }))),
            React.createElement(Grid, { container: true, item: true, xs: 12, alignItems: "center", direction: "row" },
                React.createElement(TabbedCard, { title: "Code" },
                    React.createElement(CardTab, { label: "Source" },
                        React.createElement(CodeSnippet, { text: selected_node.raw_code, language: "sql", showLineNumbers: true })),
                    React.createElement(CardTab, { label: "Compiled" },
                        React.createElement(CodeSnippet, { text: selected_node.compiled_code, language: "sql", showLineNumbers: true })))))));
};
let selected_node;
export const ModelsTable = ({ manifest, catalog }) => {
    const [isOpen, toggleDrawer] = useState(false);
    const classes = useDrawerStyles();
    const columns = [
        { title: 'Package name', field: 'package_name' },
        { title: 'Name', field: 'name' },
        { title: 'Open', field: 'open' },
    ];
    let models = [];
    for (let key in manifest.nodes) {
        if (manifest.nodes[key].resource_type === "model") {
            models.push(manifest.nodes[key]);
        }
    }
    const data = models.map(node => {
        return {
            name: node.name,
            package_name: node.package_name,
            open: (React.createElement(Button, { variant: "contained", color: "primary", size: "small", onClick: () => {
                    selected_node = node;
                    toggleDrawer(true);
                } }, "Details")),
        };
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(Table, { title: "Models:", options: { search: true, paging: true, padding: 'dense', pageSize: 20 }, columns: columns, data: data }),
        React.createElement(Drawer, { classes: {
                paper: classes.paper,
            }, anchor: "right", open: isOpen, onClose: () => toggleDrawer(false) },
            React.createElement(DrawerContent, { toggleDrawer: toggleDrawer, manifest: manifest, catalog: catalog, selected_node: selected_node }))));
};
export const TestsTable = ({ manifest, catalog }) => {
    const [isOpen, toggleDrawer] = useState(false);
    const classes = useDrawerStyles();
    const columns = [
        { title: 'Package name', field: 'package_name' },
        { title: 'Name', field: 'name' },
        { title: 'Open', field: 'open' },
    ];
    let tests = [];
    for (let key in manifest.nodes) {
        if (manifest.nodes[key].resource_type === "test") {
            tests.push(manifest.nodes[key]);
        }
    }
    const data = tests.map(node => {
        return {
            name: node.name,
            package_name: node.package_name,
            open: (React.createElement(Button, { variant: "contained", color: "primary", size: "small", onClick: () => {
                    selected_node = node;
                    toggleDrawer(true);
                } }, "Details")),
        };
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(Table, { title: "Tests:", options: { search: true, paging: true, padding: 'dense', pageSize: 20 }, columns: columns, data: data }),
        React.createElement(Drawer, { classes: {
                paper: classes.paper,
            }, anchor: "right", open: isOpen, onClose: () => toggleDrawer(false) },
            React.createElement(DrawerContent, { toggleDrawer: toggleDrawer, manifest: manifest, catalog: catalog, selected_node: selected_node }))));
};
export const ModelstableComponent = ({ manifest, catalog }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(ModelsTable, { manifest: manifest, catalog: catalog })));
};
export const TeststableComponent = ({ manifest, catalog }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(TestsTable, { manifest: manifest, catalog: catalog })));
};
