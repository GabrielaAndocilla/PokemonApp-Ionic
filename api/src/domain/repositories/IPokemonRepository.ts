import { Pokemon } from "@domains/entities/Pokemon";

export default interface IPokemonRepository {
  save(pokemon: Pokemon, userId:number): Promise<Pokemon>;
  retrieveAll(searchParams: {name?: string}, userId:number): Promise<Pokemon[]>;
  retrieveById(pokemonId: number): Promise<Pokemon | undefined>;
  updateFavorite(pokemonId: number,status:boolean): Promise<void>;
  update(pokemon: Pokemon): Promise<Pokemon>;
  delete(pokemonId: number): Promise<void>;
}
