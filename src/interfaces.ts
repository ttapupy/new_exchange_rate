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