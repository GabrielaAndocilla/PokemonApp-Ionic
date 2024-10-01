import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/authentication";

export const usePokemons = ({name}:{name?:string}) => {
  const { token } = useAuth();
  let query = ''
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  if(name)
    query += `?name=${name}`
  return useQuery({
    queryKey: ['pokemons',name],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND_HOST}/pokemon${query}`,config),
    placeholderData: keepPreviousData

  })

}
