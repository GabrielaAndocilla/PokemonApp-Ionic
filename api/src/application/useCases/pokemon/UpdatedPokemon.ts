import { Pokemon } from "@domains/entities/Pokemon";
import IPokemonRepository from '@domains/repositories/IPokemonRepository';

export class UpdatedPokemon {
  private pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(data: { id: number; name: string; height: string, abilities:string[], movements: string[]}): Promise<Pokemon> {
    const pokemon = new Pokemon(data.id, data.name, data.height,data.abilities,data.movements);
    return await this.pokemonRepository.update(pokemon);
  }
}
