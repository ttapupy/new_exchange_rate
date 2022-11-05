import React, {useEffect} from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import Table from 'react-bootstrap/Table';

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading: boolean;
}

const DataTable = <TData extends object>({data, columns, isLoading}: DataTableProps<TData>) => {

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <Table striped bordered hover size="md">
        <thead>
        {tableInstance.getHeaderGroups().map((headerGroup: any) => (
          <tr>
            {headerGroup.headers.map((header: any) => (
              <th style={{fontWeight: 600, paddingRight: "2rem"}} key={header.id}>
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
                <tr style={{height: '100px'}} key={row.id}>
                  {row.getVisibleCells().map((cell: any) => {
                    return (
                      <td key={cell.id} align={cell.column.columnDef.align || 'center'}
                          style={{paddingRight: "2rem"}}>
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