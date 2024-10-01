import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/authentication";
import { CustomPokemon } from "../models/Pokemon";

export const useSetFavoritePokemon = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient()

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  return useMutation({
    mutationFn: (id:string):Promise<CustomPokemon> => axios.patch(`${import.meta.env.VITE_BACKEND_HOST}/pokemon/favorite/${id}`,{}, config),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pokemons'] })
  })
}
