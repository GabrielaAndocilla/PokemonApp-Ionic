import { Request, Response } from "express";
import Pokemon from "../models/pokemon.model";
import PokemonRepository from "../repositories/PokemonRepository";

export default class PokemonController {
  async create(req: Request, res: Response){
    try {
      const pokemon : Pokemon = req.body
      PokemonRepository.save(pokemon)
      res.status(201).json({
        message: "Pokemon created successfully",
        reqBody: req.body
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findAll(req: Request, res: Response){
    try {
      const pokemos: Pokemon[] = await PokemonRepository.retrieveAll({})
      res.status(201).json({
        message: "Pokemon created successfully",
        reqBody: pokemos
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findById(req: Request, res: Response){
    try {
      const pokemonId = parseInt(req.params.id)
      const pokemon: Pokemon |undefined = await PokemonRepository.retrieveById(pokemonId)
      if(!pokemon) return res.status(404).json({
        message: "Pokemon Not found"
      });
      res.status(201).json({
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
