import Pokemon from "../models/pokemon.model";

export default interface IPokemonRepository {
  save(tutorial: Pokemon): Promise<Pokemon>;
  retrieveAll(searchParams: {name: string}): Promise<Pokemon[]>;
  retrieveById(pokemonId: number): Promise<Pokemon | undefined>;
  update(pokemon: Pokemon): Promise<number>;
  delete(pokemonId: number): Promise<number>;
}
