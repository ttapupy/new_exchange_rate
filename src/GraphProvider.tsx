import { PropsWithChildren } from 'react';
import { GraphContext } from "./GraphContext";
import { useQuery } from "@tanstack/react-query";
import { get30daysForCurrency } from "./services/fetchFrankfurter";
import { PeriodRatesResponse } from './interfaces';

interface IGraphProviderProps {
  toCurrency: string | null;
}



const GraphProvider = ({ toCurrency, children }: PropsWithChildren<IGraphProviderProps>) => {

  const value: PeriodRatesResponse =
    useQuery(["periodRates", { toCurrency }], () => get30daysForCurrency(toCurrency), { enabled: !!toCurrency });

  return (
    <GraphContext.Provider value={{ ...value, toCurrency }}>
      {children}
    </GraphContext.Provider>
  )
}


export default GraphProvider;