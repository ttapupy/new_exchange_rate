import '@tanstack/react-table'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    align: alignType
  }
}

type alignType = "center" | "left" | "right" | "justify" | "char" | undefined