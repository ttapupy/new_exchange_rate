import { useEffect, useMemo, useState } from 'react';
import { RateData, RatesResponse } from "../interfaces";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Container } from "react-bootstrap";
import DataTable from "./Datatable";
import { getLatest } from "../services/fetchFrankfurter";
import { useQuery } from "@tanstack/react-query";
import ActionButton from './ActionButton';

const RateList = () => {

  const columnHelper = createColumnHelper<RateData>()



  const [data, setData] = useState<RateData[]>([])
  const columns: ColumnDef<RateData>[] = useMemo(() => [
    { accessorKey: 'date', header: 'Date', meta: { align: 'left' } },
    { accessorKey: 'from', header: 'From', meta: { align: 'left' } },
    { accessorKey: 'to', header: 'To', meta: { align: 'left' } },
    { accessorKey: 'rateValue', header: 'Rate', meta: { align: 'right' } },
    columnHelper.display({
      id: 'actions',
      meta: { align: 'right' },
      header: 'Historical graphicon',
      cell: props => <ActionButton from={props.row.original.from} to={props.row.original.to} />,
    }),
  ], [columnHelper]);


  const {
    isFetching,
    data: ratesData,
    isError,
    error
  }: { isFetching: boolean, data: (RatesResponse | undefined), isError: boolean, error: (object | null | undefined) } =
    useQuery(["latestRates"], () => getLatest());

  useEffect(() => {
    if (ratesData) {
      setData(
        Object.entries(ratesData.rates).map(([k, v]) => {
          return ({ date: ratesData.date, from: 'EUR', to: k, rateValue: v })
        })
      )
    }
  }, [ratesData])

  return (
    <Container>
      <DataTable data={data} columns={columns} isLoading={isFetching} />
    </Container>


  )
}

export default RateList;