import axios from "axios";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../config";

export type AddCountriesReqType = {
  name: string;
  code: string;
  capital: string;
  lat: number;
  lng: number;
  area: number;
  population: number;
  year: number;
  img: string;
};

function useAddCountry() {
  const { mutate, isLoading, data } = useMutation(
    (data: AddCountriesReqType) => axios.post(`${apiRoute}/countries`, data),
    {
      onSuccess: () => queryClient.invalidateQueries("getCountries"),
    }
  );

  return { mutate, isLoading, data };
}

export { useAddCountry };
