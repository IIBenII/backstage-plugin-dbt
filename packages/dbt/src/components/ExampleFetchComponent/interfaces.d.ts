export type Column = {
    type: string;
    index: number;
    name: string;
    comment: string;
};
export type Stats = {
    id: string;
    label: string;
    value: number | string;
    include: boolean;
    description: string;
};
export type Node = {
    name: string;
    package_name: string;
    unique_id: string;
    description: string;
    raw_code: string;
    compiled_code: string;
    columns: Column[];
    resource_type: string;
};
export type NodeCatalog = {
    columns: Column[];
    unique_id: string;
};
export type ChildMap = {
    [key: string]: string[];
};
export type ParentMap = {
    [key: string]: string[];
};
export type Manifest = {
    nodes: Record<string, Node>;
    child_map: Record<string, ChildMap>;
    parent_map: Record<string, ParentMap>;
};
export type Catalog = {
    nodes: Record<string, NodeCatalog>;
    stats: Record<string, Stats>;
};
export type ModelsTableType = {
    manifest: Manifest;
    catalog: Catalog;
};
export type DenseTableColumns = {
    columns: Column[];
};
export type DenseTableStatsSchema = {
    stats: Stats[];
};
export type DepGraphType = {
    parent: ParentMap;
    child: ChildMap;
    model_name: string;
};
export type toggleDrawerCustom = {
    toggleDrawer: (isOpen: boolean) => void;
    manifest: Manifest;
    catalog: Catalog;
    selected_node: Node;
};
