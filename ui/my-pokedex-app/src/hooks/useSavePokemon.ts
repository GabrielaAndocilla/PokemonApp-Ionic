import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/authentication";

export const useSavePokemon = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient()
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  return useMutation({
    mutationFn: (data:any):Promise<any> =>  axios.put(`http://localhost:8081/api/pokemon/${data.id}`,data,config),
    onSuccess: (res) =>  queryClient.invalidateQueries({ queryKey: ['pokemons',res.data.id] })
  })
}
