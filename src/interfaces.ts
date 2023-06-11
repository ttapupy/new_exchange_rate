export interface RateData {
  date: string;
  from: string;
  to: string;
  rateValue: number;
}

export type Rate = Record<string, number>;

export interface RatesResponse {
  amount: number;
  base: string;
  date: string;
  rates: Rate;
}

export interface PeriodRatesData {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Rate>;
}

export interface PeriodRatesResponse {
  data: PeriodRatesData | null | undefined;
  isFetching: boolean;
  isError: boolean;
}