import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../config";
import { MarkerType } from "../pages/Map/Map";

function useGetCountries(
  page?: string,
  count?: string,
  filterFiled?: string,
  filterType?: string,
  search?: string
) {
  const {
    data: countries,
    error,
    isLoading,
  } = useQuery(
    ["getCountries", { page, count, filterFiled, filterType, search }],
    () =>
      axios.get<MarkerType[]>(`${apiRoute}/countries`, {
        data: { page, count, filterFiled, filterType, search },
      })
  );

  return { countries, error, isLoading };
}

export { useGetCountries };
