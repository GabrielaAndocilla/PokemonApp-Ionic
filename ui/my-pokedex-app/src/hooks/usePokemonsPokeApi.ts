import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePokemonsPokeApi = (url:string) => {
  return useQuery({
    queryKey: ['allPokemons', { url }],
    queryFn: () => axios.get(url),
    staleTime: Infinity,
  })

}
