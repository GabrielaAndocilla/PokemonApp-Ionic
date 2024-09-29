import IPokemonRepository from '@domains/repositories/IPokemonRepository';

export class DeletePokemon {
  private pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async execute(pokemonId:number): Promise<void> {
    return  this.pokemonRepository.delete(pokemonId)
  }
}
