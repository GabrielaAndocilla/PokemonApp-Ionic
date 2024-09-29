import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/authentication";

export const usePokemon = (id:string) => {
  const { token } = useAuth();
  console.log('usePokemon',id)
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:8081/api/pokemon/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ['pokemons',  id],
    queryFn: () => axios.request(config),
  })

}
