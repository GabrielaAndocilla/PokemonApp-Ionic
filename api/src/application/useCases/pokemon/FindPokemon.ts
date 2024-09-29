import { Pokemon } from "@domains/entities/Pokemon";
import IPokemonRepository from '@domains/repositories/IPokemonRepository';

export class FindPokemon {
  private pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(pokemonId:number): Promise<Pokemon|undefined> {
    return await this.pokemonRepository.retrieveById(pokemonId);
  }
}
