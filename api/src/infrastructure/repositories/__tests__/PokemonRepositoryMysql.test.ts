import { Pokemon } from "@domains/entities/Pokemon";
import PokemonRepositoryMySql from "@repositories/PokemonRepositoryMySql";
import connection from "../../db";

jest.mock("../../db", () => ({
  query: jest.fn(),
}));

describe('PokemonRepository', ()=>{
  const pokemonRepository = new PokemonRepositoryMySql()

  let querySpy: jest.SpyInstance;

  beforeEach(() => {
    querySpy = jest.spyOn(connection, 'query');
  });

  afterEach(() => {
    querySpy.mockRestore();
  });

  it('should insert pokemon', async ()=>{
    querySpy.mockImplementation( (query, values, callback) => {
       callback(null,{ insertId: 144 });
    });

    const mockPokemon:Pokemon = {
      name:'pokemonTest',
      height:'12.5',
      abilities:['ability1'],
      movements:['movement1']
    }

    const pokemon = await pokemonRepository.save(mockPokemon,1)

    expect(connection.query).toHaveBeenNthCalledWith(1,
      "INSERT INTO pokemons (name, height,user_id) VALUES(?,?,?)",
      ['pokemonTest', '12.5', 1],
      expect.any(Function)
    );

    expect(connection.query).toHaveBeenNthCalledWith(2,
      "INSERT INTO abilities (pokemon_id, ability_name) VALUES (?, ?)",
      [144, 'ability1'],
      expect.any(Function)
    );

    expect(connection.query).toHaveBeenNthCalledWith(3,
      "INSERT INTO moves (pokemon_id, move_name) VALUES (?, ?)",
      [144, 'movement1'],
      expect.any(Function)
    );
    expect(connection.query).toHaveBeenCalledTimes(3)
    expect(pokemon).toBe(mockPokemon)

  })

  describe('retrieveAll function',()=>{
    it('should retrieve all pokemons when name is empty', async ()=>{
      querySpy.mockImplementation( (query, callback) => {
         callback(null,[
          {name:'pokemonTest1',height:'12', abilities:['ability1'],movements:['movement1']},
          {name:'pokemonTest2',height:'13', abilities:['ability2'],movements:['movement2']},
          {name:'pokemonTest3',height:'14', abilities:['ability3'],movements:['movement3']}
         ]);
      });

      const pokemons = await pokemonRepository.retrieveAll({},1)
      expect(connection.query).toHaveBeenCalledTimes(1)
      expect(pokemons.length).toBe(3)

    })

    it('should retrieve all pokemons when name is not empty', async ()=>{
      querySpy.mockImplementation( (query, callback) => {
         callback(null,[
          {name:'pokemonTest1',height:'12', abilities:['ability1'],movements:['movement1']},
         ]);
      });

      const pokemons = await pokemonRepository.retrieveAll({name:'pokemon'},1)
      expect(connection.query).toHaveBeenCalledWith(
        "SELECT id, name, height, is_favorite as isFavorite FROM pokemons WHERE user_id = 1 and LOWER(name) LIKE '%pokemon%'",
        expect.any(Function)
      );
      expect(connection.query).toHaveBeenCalledTimes(1)
      expect(pokemons.length).toBe(1)

    })

    it('should manage error', async ()=>{
      querySpy.mockImplementation( (query, callback) => {
         callback(new Error('error getting data'),{});
      });

      await expect(pokemonRepository.retrieveAll({},1)).rejects.toThrow('error getting data')

    })
  })

  describe('retrieveById function',()=>{
    it('should retrieve by Id', async ()=>{
      querySpy.mockImplementation( (query,values, callback) => {
         callback(null,[
          {id:1,name:'pokemonTest1',height:'12', abilities:['ability1'],movements:['movement1']}
         ]);
      });
      await pokemonRepository.retrieveById(1)
      expect(connection.query).toHaveBeenCalledTimes(3)
    })

    it('should manage error', async ()=>{
      querySpy.mockImplementation( (query,values, callback) => {
         callback(new Error('error getting data'),{});
      });
      await expect(pokemonRepository.retrieveById(1)).rejects.toThrow('error getting data')
    })

    it('should manage error when pokemon is not founded', async ()=>{
      querySpy.mockImplementation( (query,values, callback) => {
         callback(null,[]);
      });
      await expect(pokemonRepository.retrieveById(1)).rejects.toThrow('Pokémon no encontrado')
    })
  })

  it('should update pokemon favorite status', async ()=>{
    querySpy.mockImplementation( (query, values, callback) => {
       callback(null,{ affectedRows: 1 });
    });
   await pokemonRepository.updateFavorite(144,false)

    expect(connection.query).toHaveBeenCalledWith(
      "UPDATE pokemons SET is_favorite = ? WHERE id = ? ",
      [false,144],
      expect.any(Function)
    );
    expect(connection.query).toHaveBeenCalledTimes(1)

  })

  describe('delete function', () =>{
    it('should delete pokemon', async ()=>{
      querySpy.mockImplementation( (query, values, callback) => {
         callback(null,{ affectedRows: 1 });
      });
     await pokemonRepository.delete(144)

      expect(connection.query).toHaveBeenNthCalledWith(3,
        "DELETE FROM pokemons WHERE id = ?",
        [144],
        expect.any(Function)
      );
      expect(connection.query).toHaveBeenCalledTimes(3)
    })

    it('should manage error when pokemon not founded', async ()=>{
      querySpy.mockImplementation( (query, values, callback) => {
         callback(null,{ affectedRows: 0 });
      });

      await expect(pokemonRepository.delete(144)).rejects.toThrow('Pokémon no encontrado')
      expect(connection.query).toHaveBeenCalledTimes(3)

    })

  })
})
