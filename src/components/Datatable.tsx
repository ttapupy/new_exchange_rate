import {
  ColumnDef,
  ColumnMeta,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import Table from 'react-bootstrap/Table';

export interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
}



const DataTable = <TData extends object, TValue>({ data, columns, isLoading }: DataTableProps<TData, TValue>) => {

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <Table striped hover size="md">
        <thead style={{ position: "sticky", top: '0' }}>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr>
              {headerGroup.headers.map((header) => (
                <th style={{ fontWeight: 600, padding: "0.5rem 2rem" }} key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ?
            <tr>
              <th>{'in progress...'}</th>
            </tr> :
            (data?.length > 0 ?
              tableInstance.getRowModel().rows.map(row => {
                return (
                  <tr style={{ height: '60px', padding: "0 1rem", textAlign: 'center' }} key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} align={(cell.column.columnDef.meta as ColumnMeta<TData, TValue>)?.align || 'center'}
                          style={{ paddingRight: "1rem" }}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                  </tr>
                )
              }) :
              <tr>
                <th>{'No result'}</th>
              </tr>)
          }
        </tbody>
      </Table>
    </>
  )
}

export default DataTable;