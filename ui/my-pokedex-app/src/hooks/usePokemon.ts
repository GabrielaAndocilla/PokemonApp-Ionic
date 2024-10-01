import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/authentication";

export const usePokemon = (id:string) => {
  const { token } = useAuth();
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_HOST}/pokemon/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ['pokemons',  id],
    queryFn: () => axios.request(config),
  })

}
