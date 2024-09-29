import { ResultSetHeader, RowDataPacket } from "mysql2";

import { Pokemon } from "@domains/entities/Pokemon";
import IPokemonRepository from "@domains/repositories/IPokemonRepository";
import connection from "../db";

class PokemonRepositoryMySql implements IPokemonRepository {

  constructor(){
    console.log('w')
  }

  private insertMovementsAndAbilities(movements: string [], abilities: string[], id:number):Promise<void[]> {
    const insertAbilitiesPromises = abilities.map((abilityName: string) =>
      new Promise<void>((resolveAbility, rejectAbility) => {
        connection.query(
          "INSERT INTO abilities (pokemon_id, ability_name) VALUES (?, ?)",
          [id, abilityName],
          (err,res) => {
            console.log('res insertAbilitiesPromises',res)
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
          console.log('res insertMovementsPromises',res)
          console.error(err)
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
    throw new Error("a");

    console.log('entre')
    return new Promise((resolve, reject) => {
      console.log('a')
      connection.query<ResultSetHeader>(
        "INSERT INTO pokemons (name, height,user_id) VALUES(?,?,?)",
        [pokemon.name, pokemon.height,userId],
        async (err, res) => {
          console.log('res',res)
          if (err) {
            console.log('err',err)
            return reject(err);
          }
          const pokemonId = res.insertId;
          const abilities = pokemon.abilities || [];
          const movements = pokemon.movements || [];
          await this.insertMovementsAndAbilities(movements,abilities,pokemonId)
          resolve(pokemon)
        }
      );
    });

  }

  retrieveAll(searchParams: { name?: string; }, user_id:number): Promise<Pokemon[]> {
    let query: string = `SELECT id, name, height, is_favorite as isFavorite FROM pokemons WHERE user_id = ${user_id}`;
    if (searchParams?.name)
      query += ` and LOWER(name) LIKE '%${searchParams.name}%'`
    console.log(query)
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
        (err, results) => {
          if (err) {
            reject(err);
          } else if (results.length === 0) {
            reject(new Error("Pokémon no encontrado"));
          } else {
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
        }
      );
    });
  }

  updateFavorite(pokemonId: number, status:boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log({status, pokemonId})
      connection.query(
        "UPDATE pokemons SET is_favorite = ? WHERE id = ? ",
        [status, pokemonId],
         (err, res) => {
          if(err) return reject()
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
            console.log('updating')
            if (err) {
              console.error(err)
              reject(err);
            } else {
              await this.deleteMovementsAndAbilities(pokemon.id!)
              const abilities = pokemon.abilities || [];
              const movements = pokemon.movements || [];
              await this.insertMovementsAndAbilities(movements,abilities,pokemon.id!)
              return this.retrieveById(pokemon?.id!)
              .then((updatedPokemon) => {
                console.log({updatedPokemon})
                return resolve(updatedPokemon as Pokemon)
              })
              .catch((err)=>{
                console.error(err)
                reject()
              });
            }
          } catch (error) {
            console.error(error)
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
        if (err) {
          reject(err);
        } else if (res.affectedRows === 0) {
          reject(new Error("Pokémon no encontrado"));
        } else {
          resolve();
        }
      });
    });
  }

}

export default PokemonRepositoryMySql;
