import { ResultSetHeader } from "mysql2";
import connection from "../db";
import Pokemon from "../models/pokemon.model";
import IPokemonRepository from "./IPokemonRepository";

class PokemonRepository implements IPokemonRepository {

  save(pokemon: Pokemon): Promise<Pokemon> {
    return new Promise((resolve,reject)=> {
      console.log('create')
      connection.query<ResultSetHeader>("INSERT INTO pokemons (name, height) VALUES(?,?)",[pokemon.name, pokemon.height],(err, res) => {
        if (err) reject(err);
        else
          this.retrieveById(res.insertId)
            .then((tutorial) => resolve(tutorial!))
            .catch(reject);
      })
    })
  }

  retrieveAll(searchParams: { name?: string; }): Promise<Pokemon[]> {
    console.log('rretrieveAlle')
    let query: string = "SELECT * FROM pokemons";

    if (searchParams?.name)
      query += `WHERE LOWER(name) LIKE '%${searchParams.name}%'`

    return new Promise((resolve, reject) => {
      connection.query<Pokemon[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(pokemonId: number): Promise<Pokemon | undefined> {
    console.log('retrieveById')
    return new Promise((resolve, reject) => {
      connection.query<Pokemon[]>(
        "SELECT * FROM pokemons WHERE id = ?",
        [pokemonId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(tutorial: Pokemon): Promise<number> {
    throw new Error("Method not implemented.");
  }

  delete(pokemonId: number): Promise<number> {
    throw new Error("Method not implemented.");
  }

}

export default new PokemonRepository();
