import { Request, Response } from "express";
import { CreatePokemon } from "../../application/use_cases/pokemon/CreatePokemon";
import { Pokemon } from "../../domain/entities/Pokemon";
import IPokemonRepository from "../../domain/repositories/IPokemonRepository";
import { ExtendReq } from "../middlewares/authMiddleware";

export default class PokemonController {
    private pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  create = async (req: ExtendReq, res: Response) =>{
    try {
      const createPokemon = new CreatePokemon(this.pokemonRepository);
      await createPokemon.execute(req.body);
      return res.status(201).json({
        message: "Pokemon created successfully",
        reqBody: req.body
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  findAll = async (req: ExtendReq, res: Response) => {
    try {
      const pokemons: Pokemon[] = await this.pokemonRepository.retrieveAll({})
      return res.status(201).json({
        message: "Pokemon created successfully",
        reqBody: pokemons
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  findById = async (req: Request, res: Response) => {
    try {
      const pokemonId = parseInt(req.params.id)
      const pokemon: Pokemon |undefined = await this.pokemonRepository.retrieveById(pokemonId)
      if(!pokemon) return res.status(404).json({
        message: "Pokemon Not found"
      });
      return res.status(201).json({
        message: "Successfully find Pokemon",
        reqBody: pokemon
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

}
