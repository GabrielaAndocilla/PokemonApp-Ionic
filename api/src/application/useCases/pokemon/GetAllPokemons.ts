import { Pokemon } from "@domains/entities/Pokemon";
import IPokemonRepository from '@domains/repositories/IPokemonRepository';

export class GetAllPokemons {
  private pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(searchParams: {name?: string},userId:number): Promise<Pokemon[]> {
    return await this.pokemonRepository.retrieveAll(searchParams,userId)
  }
}
