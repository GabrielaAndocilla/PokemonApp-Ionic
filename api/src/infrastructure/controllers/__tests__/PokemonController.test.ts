import PokemonController from "@controllers/PokemonController";
import { Pokemon } from "@domains/entities/Pokemon";
import { ExtendReq } from "@middleware/authMiddleware";
import PokemonRepositoryMySql from "@repositories/PokemonRepositoryMySql";
import { CreatePokemon } from "@useCases/pokemon/CreatePokemon";
import { DeletePokemon } from "@useCases/pokemon/DeletePokemon";
import { FindPokemon } from "@useCases/pokemon/FindPokemon";
import { GetAllPokemons } from "@useCases/pokemon/GetAllPokemons";
import { SetAsFavorite } from "@useCases/pokemon/SetAsFavorite";
import { UpdatedPokemon } from "@useCases/pokemon/UpdatedPokemon";
import { Request, Response } from "express";

jest.mock("@useCases/pokemon/CreatePokemon");
jest.mock("@useCases/pokemon/GetAllPokemons");
jest.mock("@useCases/pokemon/FindPokemon");
jest.mock("@useCases/pokemon/UpdatedPokemon");
jest.mock("@useCases/pokemon/DeletePokemon");
jest.mock("@useCases/pokemon/SetAsFavorite");

jest.mock("../../db", () => ({
  query: jest.fn(),
}));

describe('Test Pokemon Controller',()=>{
  let req: Partial<ExtendReq>;
  let res: Partial<Response>;
  const mockPokemon:Pokemon = {
    name:'pokemonTest',
    height:'12.5',
    abilities:['ability1'],
    movements:['movement1']
  }

  it('should execute create',async () => {
    const createPokemon: CreatePokemon = {
      execute: jest.fn(),
    } as unknown as CreatePokemon;

    req = { body: mockPokemon ,user: {userId:1} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (createPokemon.execute as jest.Mock).mockResolvedValue(mockPokemon);

    const repo = new PokemonRepositoryMySql()
    const controller = new PokemonController(repo)
    await controller.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({message:"Pokemon created successfully",reqBody:mockPokemon});
  })

  it('should execute findAll',async () => {
    const mockExecute = jest.fn().mockResolvedValue([]);
    (GetAllPokemons as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    req = { body: {} ,user: {userId:1} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const repo = {} as PokemonRepositoryMySql
    const controller = new PokemonController(repo)
    await controller.findAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({message:"Bring All pokemon successfully",data:[]});
  })

  it('should execute findById',async () => {
    const mockExecute = jest.fn().mockResolvedValue(mockPokemon);
    (FindPokemon as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    req = {params:{id:'144'},body: {} ,user: {userId:1} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const repo = {} as PokemonRepositoryMySql
    const controller = new PokemonController(repo)
    await controller.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({message:"Successfully find Pokemon",data:mockPokemon});
  })

  it('should execute update',async () => {
    const id  = 144
    const mockExecute = jest.fn().mockResolvedValue({id,...mockPokemon});
    (UpdatedPokemon as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    req = {params:{id:'144'},body: {} ,user: {userId:1} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const repo = {} as PokemonRepositoryMySql
    const controller = new PokemonController(repo)
    await controller.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({message:"Successfully update Pokemon",data:{id,...mockPokemon}});
  })

  it('should execute delete',async () => {
    const mockExecute = jest.fn();
    (DeletePokemon as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    req = {params:{id:'144'},body: {} ,user: {userId:1} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const repo = {} as PokemonRepositoryMySql
    const controller = new PokemonController(repo)
    await controller.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({message:"Successfully delete Pokemon"});
  })

  it('should execute setAsFavorite',async () => {
    const mockExecute = jest.fn();
    (SetAsFavorite as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    req = {params:{id:'144'},body: {} ,user: {userId:1} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const repo = {} as PokemonRepositoryMySql
    const controller = new PokemonController(repo)
    await controller.setAsFavorite(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({message:"Successfully setAsFavorite Pokemon"});
  })

})
