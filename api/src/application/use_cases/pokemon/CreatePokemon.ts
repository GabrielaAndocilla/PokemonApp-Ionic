import { Pokemon } from "../../../domain/entities/Pokemon";
import IPokemonRepository from '../../../domain/repositories/IPokemonRepository';

export class CreatePokemon {
  private pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    console.log('e')
    this.pokemonRepository = pokemonRepository;
  }

  async execute(data: { id: number; name: string; height: string }): Promise<Pokemon> {
    const pokemon = new Pokemon(data.id, data.name, data.height);
    return await this.pokemonRepository.save(pokemon);
  }
}
