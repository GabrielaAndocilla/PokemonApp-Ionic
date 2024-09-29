import PokemonRepositoryMySql from "../PokemonRepositoryMySql";
import mysql from 'mysql2';

jest.mock('mysql2', () => {
  return {
    createConnection: jest.fn(() => ({
      execute: jest.fn(),
      // Include any other methods you need
    })),
  };
});

// describe('PokemonRepository', ()=>{
//   const pokemonRepository = new PokemonRepositoryMySql()
//   // let mockConnection: any;

//   beforeEach(() => {
//     // mockConnection = {
//     //   execute: jest.fn(),
//     // };
//     // (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection);
//   });

//   it('should save', async ()=>{
//     console.log("Before saving");

//     // mockConnection.execute
//     // .mockResolvedValueOnce([
//     //   [{ id: '1', name: 'pokemonTest',height:'12..5', is_favorite: false }], []])
//     // .mockResolvedValueOnce([
//     //   [{ id: '1', ability_name: 'ability1',pokemon_id:1 }], []])
//     // .mockResolvedValue([
//     //   [{ id: '1', move_name: 'movement1',pokemon_id:1 }], []])
//     const mockPokemon:Pokemon = {
//       name:'pokemonTest',
//       height:'12.5',
//       abilities:['ability1'],
//       movements:['movement1']
//     }
//     try {

//       await pokemonRepository.save(mockPokemon,1)
//     }  catch (error) {
//       console.error("Error in save method:", error); // Log the error if any
//     }
//     await expect(await pokemonRepository.save(mockPokemon, 1)).rejects.toThrow("a");

//   })
// })

describe('PokemonRepositoryMySql', () => {
  it('should throw an error when save is called', async () => {
    const repo = new PokemonRepositoryMySql();
    console.log("Repo instantiated"); // Log to confirm repo is created
    await repo.save({}, 1)
  });
});
