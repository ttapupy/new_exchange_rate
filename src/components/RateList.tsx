import React, {useEffect, useMemo, useState} from 'react';
import {RateData, RatesResponse} from "../interfaces";
import {ColumnDef} from "@tanstack/react-table";
import {Container} from "react-bootstrap";
import DataTable from "./Datatable";
import {getLatest} from "../services/fetchFrankfurter";
import {useQuery} from "@tanstack/react-query";


const RateList = () => {

  const [data, setData] = useState<RateData[]>([])


  const columns: ColumnDef<RateData>[] = useMemo(() => [
    { accessorKey: 'date', header: 'Date', align: 'left' },
    { accessorKey: 'from', header: 'From', align: 'left' },
    { accessorKey: 'to', header: 'To', align: 'left' },
    { accessorKey: 'rateValue', header: 'Rate', align: 'right' },
  ], []);


    const {
      isFetching,
      data : ratesData,
      isError,
      error
    }: { isFetching: boolean, data: (RatesResponse | undefined), isError: boolean, error: (object | null | undefined) } =
        useQuery(["latestRates"], () => getLatest());

    useEffect(() => {
      if (ratesData) {
        setData(
        Object.entries(ratesData.rates).map(([k, v]) => {
          return ({date: ratesData.date, from: 'EUR', to: k, rateValue: v})
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