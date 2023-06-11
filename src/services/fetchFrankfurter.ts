import { frankfurterApi } from "../api";
import { subDays } from 'date-fns';

export const getLatest = async () => {
  const response = await frankfurterApi.get(`latest`);
  return response.data;
}

// base curr is EUR
export const get30daysForCurrency = async (currencyTo: string | null | undefined) => {
  if (currencyTo == null) return null;

  const date = new Date;
  const today = date.toISOString().slice(0, 10)
  const startDate = subDays(date, 30).toISOString().slice(0, 10)
  const response = await frankfurterApi.get(`${startDate}..${today}?to=${currencyTo}`);
  return response.data;
}