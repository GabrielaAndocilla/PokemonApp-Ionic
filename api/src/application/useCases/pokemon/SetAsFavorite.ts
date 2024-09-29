import IPokemonRepository from '@domains/repositories/IPokemonRepository';

export class SetAsFavorite {
  private pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(pokemon_id:number): Promise<void> {
    const pokemon = await this.pokemonRepository.retrieveById(pokemon_id)
    if(!pokemon) return
    const newStatus = pokemon?.isFavorite ? false : true
    return await this.pokemonRepository.updateFavorite(pokemon_id, newStatus)
  }
}
