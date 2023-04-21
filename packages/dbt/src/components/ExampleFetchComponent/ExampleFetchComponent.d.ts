import { DenseTableColumns, DepGraphType, ModelsTableType, DenseTableStatsSchema } from './interfaces';
export declare const DenseTableC: ({ columns }: DenseTableColumns) => JSX.Element;
export declare const DenseTableStats: ({ stats }: DenseTableStatsSchema) => JSX.Element;
export declare const DepGraph: ({ parent, child, model_name }: DepGraphType) => JSX.Element;
export declare const ModelsTable: ({ manifest, catalog }: ModelsTableType) => JSX.Element;
export declare const TestsTable: ({ manifest, catalog }: ModelsTableType) => JSX.Element;
export declare const ModelstableComponent: ({ manifest, catalog }: ModelsTableType) => JSX.Element;
export declare const TeststableComponent: ({ manifest, catalog }: ModelsTableType) => JSX.Element;
