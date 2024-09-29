import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/authentication";

export const usePokemons = ({name}:{name:string}) => {
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
    queryFn: () => axios.get(`http://localhost:8081/api/pokemon${query}`,config),
    placeholderData: keepPreviousData

  })

}
