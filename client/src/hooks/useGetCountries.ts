import axios from "axios";
import { useQuery } from "react-query";
import { apiRoute } from "../config";
import { MarkerType } from "../pages/Map/Map";

function useGetCountries(
  page?: string,
  count?: number,
  search?: string,
  filterFiled?: string,
  filterType?: string
) {
  const {
    data: countries,
    error,
    isLoading,
  } = useQuery(
    ["getCountries", { page, count, search, filterFiled, filterType }],
    () =>
      axios.get<{ countries: MarkerType[]; countriesLength: number }>(
        `${apiRoute}/countries?${page ? `page=${page}` : ``}&&${
          count ? `count=${count}` : ``
        }&&${search ? `search=${search}` : ``}
        `,
        {
          data: { page, count, search, filterFiled, filterType },
        }
      )
  );

  return { countries, error, isLoading };
}

export { useGetCountries };
