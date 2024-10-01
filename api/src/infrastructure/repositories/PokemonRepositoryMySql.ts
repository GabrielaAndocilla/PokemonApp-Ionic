import { ResultSetHeader, RowDataPacket } from "mysql2";

import { Pokemon } from "@domains/entities/Pokemon";
import IPokemonRepository from "@domains/repositories/IPokemonRepository";
import connection from "../db";

class PokemonRepositoryMySql implements IPokemonRepository {

  constructor(){ }

  private insertMovementsAndAbilities(movements: string [], abilities: string[], id:number):Promise<void[]> {
    const insertAbilitiesPromises = abilities.map((abilityName: string) =>
      new Promise<void>((resolveAbility, rejectAbility) => {
        connection.query(
          "INSERT INTO abilities (pokemon_id, ability_name) VALUES (?, ?)",
          [id, abilityName],
          (err,res) => {
            if (err) rejectAbility(err);
            else resolveAbility();
          }
        );
      })
  );

  const insertMovementsPromises = movements.map((movementName: string) =>
    new Promise<void>((resolveMovement, rejectMovement) => {
      connection.query(
        "INSERT INTO moves (pokemon_id, move_name) VALUES (?, ?)",
        [id, movementName],
        (err,res) => {
          if (err) rejectMovement(err);
          else resolveMovement();
        }
      );
    }));
  return Promise.all([...insertAbilitiesPromises, ...insertMovementsPromises])
  }

  private deleteMovementsAndAbilities(id:number):Promise<void[]> {
    const deleteAbilities = new Promise<void>((resolveDelete, rejectDelete) => {
      connection.query("DELETE FROM abilities WHERE pokemon_id = ?", [id], (err) => {
        if (err) rejectDelete(err);
        else resolveDelete();
      });
    });

    const deleteMovements = new Promise<void>((resolveDelete, rejectDelete) => {
      connection.query("DELETE FROM moves WHERE pokemon_id = ?", [id], (err) => {
        if (err) rejectDelete(err);
        else resolveDelete();
      });
    });
  return Promise.all([deleteAbilities, deleteMovements])
  }

  save(pokemon: Pokemon, userId:number): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO pokemons (name, height,user_id) VALUES(?,?,?)",
        [pokemon.name, pokemon.height,userId],
        async (err, res) => {
          if (err) {
            return reject(err);
          }
          const pokemonId = res.insertId;
          const abilities = pokemon.abilities || [];
          const movements = pokemon.movements || [];
          await this.insertMovementsAndAbilities(movements,abilities,pokemonId)
          return resolve(pokemon)
        }
      );
    });

  }

  retrieveAll(searchParams: { name?: string; }, user_id:number): Promise<Pokemon[]> {
    let query: string = `SELECT id, name, height, is_favorite as isFavorite FROM pokemons WHERE user_id = ${user_id}`;
    if (searchParams?.name)
      query += ` and LOWER(name) LIKE '%${searchParams.name}%'`
    return new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(query, (err, res) => {
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
        (err, results) => {
          if (err) return reject(err);
          if (results.length === 0) return reject(new Error("Pokémon no encontrado"));

          const pokemonRow: RowDataPacket= results[0];
          const abilitiesQuery = new Promise<string[]>((resolveAbilities, rejectAbilities) => {
              connection.query<RowDataPacket[]>(
                "SELECT ability_name FROM abilities WHERE pokemon_id = ?",
                [pokemonId],
                (err, abilitiesResults) => {
                  if (err) rejectAbilities(err);
                  else resolveAbilities(abilitiesResults.map((row: any) => row.ability_name));
                }
              );
            });

          const movementsQuery = new Promise<string[]>((resolveMovements, rejectMovements) => {
              connection.query<RowDataPacket[]>(
                "SELECT move_name FROM moves WHERE pokemon_id = ?",
                [pokemonId],
                (err, movementsResults) => {
                  if (err) rejectMovements(err);
                  else resolveMovements(movementsResults.map((row: any) => row.move_name));
                }
              );
            });

          Promise.all([abilitiesQuery, movementsQuery])
            .then(([abilities, movements]) => {
              const pokemon = new Pokemon(pokemonRow.id,pokemonRow.name, pokemonRow.height,abilities,movements, pokemonRow.is_favorite)
              resolve(pokemon);
            })
            .catch(reject);

        }
      );
    });
  }

  updateFavorite(pokemonId: number, status:boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE pokemons SET is_favorite = ? WHERE id = ? ",
        [status, pokemonId],
         (err, res) => {
          if(err) return reject(err)
          resolve()
        }
      );
    });
  }


  update(pokemon: Pokemon): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE pokemons SET name = ?, height = ? WHERE id = ?",
        [pokemon.name, pokemon.height, pokemon.id],
        async (err, res) => {
          try {
            if (err) return reject(err);
            await this.deleteMovementsAndAbilities(pokemon.id!)
            const abilities = pokemon.abilities || [];
            const movements = pokemon.movements || [];
            await this.insertMovementsAndAbilities(movements,abilities,pokemon.id!)
            return this.retrieveById(pokemon?.id!)
            .then((updatedPokemon) => {
              return resolve(updatedPokemon as Pokemon)
            })
            .catch((err)=>{
              reject()
            });
          } catch (error) {
            reject()
          }
        }
      );
    });
  }

  delete(pokemonId: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.deleteMovementsAndAbilities(pokemonId)
      connection.query<ResultSetHeader>("DELETE FROM pokemons WHERE id = ?", [pokemonId], (err, res) => {
        if (err) return reject(err);
        if (res.affectedRows === 0) return reject(new Error("Pokémon no encontrado"));
        resolve();
      });
    });
  }

}

export default PokemonRepositoryMySql;
