import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/authentication";
import { CustomPokemon } from "../models/Pokemon";

export const useSavePokemon = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient()
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  return useMutation({
    mutationFn: (data:CustomPokemon):Promise<any> =>  axios.put(`${import.meta.env.VITE_BACKEND_HOST}/pokemon/${data.id}`,data,config),
    onSuccess: (res) =>  queryClient.invalidateQueries({ queryKey: ['pokemons'] })
  })
}
