import { ResultSetHeader, RowDataPacket } from "mysql2";

import { Pokemon } from "../../domain/entities/Pokemon";
import IPokemonRepository from "../../domain/repositories/IPokemonRepository";
import connection from "../db";

class PokemonRepositoryMySql implements IPokemonRepository {

  constructor(){}

  save(pokemon: Pokemon): Promise<Pokemon> {
    return new Promise((resolve,reject)=> {
      connection.query<ResultSetHeader>("INSERT INTO pokemons (name, height) VALUES(?,?)",[pokemon.name, pokemon.height],(err, res) => {
        if (err) reject(err);
        else
          this.retrieveById(res.insertId)
            .then((pokemon) => resolve(pokemon!))
            .catch(reject);
      })
    })
  }

  retrieveAll(searchParams: { name?: string; }): Promise<Pokemon[]> {
    let query: string = "SELECT * FROM pokemons";

    if (searchParams?.name)
      query += `WHERE LOWER(name) LIKE '%${searchParams.name}%'`

    return new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(query, (err, res) => {
        console.log(res)
        if (err) reject(err);
        else resolve(res as Pokemon[]);
      });
    });
  }

  retrieveById(pokemonId: number): Promise<Pokemon | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(
        "SELECT * FROM pokemons WHERE id = ?",
        [pokemonId],
        (err, res) => {
          console.log(res)
          if (err) reject(err);
          else resolve(res?.[0] as Pokemon);
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

export default PokemonRepositoryMySql;
