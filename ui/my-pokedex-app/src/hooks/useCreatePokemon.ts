import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/authentication";
import { CustomPokemon } from "../models/Pokemon";

export const useCreatePokemon = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient()

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  return useMutation({
    mutationFn: (data:CustomPokemon):Promise<CustomPokemon> => axios.post(`http://localhost:8081/api/pokemon`,data, config),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pokemons'] })
  })
}
