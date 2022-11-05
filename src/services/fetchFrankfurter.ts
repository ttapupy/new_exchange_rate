import { frankfurterApi } from "../api";

export const getLatest = async () => {
  const response = await frankfurterApi.get(`latest`);
  return response.data;
}