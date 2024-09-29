import PokemonController from "@controllers/PokemonController";
import PokemonRepositoryMySql from "@repositories/PokemonRepositoryMySql";
jest.mock('mysql2', () => {
  return {
    createConnection: jest.fn(() => ({
      execute: jest.fn(),
      // Include any other methods you need
    })),
  };
});

describe('TestPokemonController',()=>{
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { params: { id: '1' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('test',async ()=>{
    const repo = new PokemonRepositoryMySql()
    const controller = new PokemonController(repo)
    console.log(controller.create)
    await controller.create(req, res); // Llamada al método
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Pokémon creado", pokemon: { id: 1, name: 'Pikachu' } });
  })
})
