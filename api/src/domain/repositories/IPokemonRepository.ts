import { Pokemon } from "../entities/Pokemon";

export default interface IPokemonRepository {
  save(pokemon: Pokemon): Promise<Pokemon>;
  retrieveAll(searchParams: {name?: string}): Promise<Pokemon[]>;
  retrieveById(pokemonId: number): Promise<Pokemon | undefined>;
  update(pokemon: Pokemon): Promise<number>;
  delete(pokemonId: number): Promise<number>;
}
