import { createContext, useContext } from 'react'
import { PeriodRatesResponse } from './interfaces';


export interface IProviderValue extends PeriodRatesResponse {
  toCurrency: string | null;
}

const initialData: IProviderValue = { isFetching: false, isError: false, data: null, toCurrency: null }

export const GraphContext = createContext(initialData)

export const useGraphContext = () => {
  return useContext(GraphContext);
}