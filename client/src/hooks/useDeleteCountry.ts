import axios from "axios";
import { useMutation } from "react-query";
import { apiRoute, queryClient } from "../config";

export type DeleteCountriesReqType = {
  id: number;
};

function useDeleteCountry(
  closeModal: React.Dispatch<
    React.SetStateAction<{
      name: string;
      id: number;
    } | null>
  >
) {
  const { mutate, isLoading, data } = useMutation(
    (data: DeleteCountriesReqType) =>
      axios.delete(`${apiRoute}/countries`, { data }),
    {
      onSuccess: () => {
        closeModal(null);
        queryClient.invalidateQueries("getCountries");
      },
      onError: () => closeModal(null),
    }
  );

  return { mutate, isLoading, data };
}

export { useDeleteCountry };
