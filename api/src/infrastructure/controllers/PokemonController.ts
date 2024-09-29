import { Pokemon } from "@domains/entities/Pokemon";
import IPokemonRepository from "@domains/repositories/IPokemonRepository";
import { ExtendReq } from "@middleware/authMiddleware";
import { CreatePokemon } from "@useCases/pokemon/CreatePokemon";
import { DeletePokemon } from "@useCases/pokemon/DeletePokemon";
import { FindPokemon } from "@useCases/pokemon/FindPokemon";
import { GetAllPokemons } from "@useCases/pokemon/GetAllPokemons";
import { SetAsFavorite } from "@useCases/pokemon/SetAsFavorite";
import { UpdatedPokemon } from "@useCases/pokemon/UpdatePokemon";
import { Request, Response } from "express";

export default class PokemonController {
    private pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    console.log('pls')
    this.pokemonRepository = pokemonRepository;
  }

  create = async (req: ExtendReq, res: Response) =>{
    console.log('pls2')
    try {
      const createPokemon = new CreatePokemon(this.pokemonRepository);
      await createPokemon.execute(req.body, req.user.userId);
      return res.status(201).json({
        message: "Pokemon created successfully",
        reqBody: req.body
      });
    } catch (err) {
      console.error(err)
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  findAll = async (req: ExtendReq, res: Response) => {
    try {
      const getAllPokemons = new GetAllPokemons(this.pokemonRepository);
      const pokemons: Pokemon[] = await getAllPokemons.execute(req.query,req.user.userId);
      return res.status(201).json({
        message: "Bring All pokemon successfully",
        data: pokemons
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
      const findPokemon = new FindPokemon(this.pokemonRepository);
      const pokemon: Pokemon |undefined  = await findPokemon.execute(pokemonId);
      if(!pokemon) return res.status(404).json({
        message: "Pokemon Not found"
      });
      return res.status(201).json({
        message: "Successfully find Pokemon",
        data: pokemon
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  update = async (req: Request, res: Response) =>{
    try {
      const { id } = req.params;
      console.log('COntrolling Updating')
      const updatePokemon = new UpdatedPokemon(this.pokemonRepository);
      const pokemon: Pokemon |undefined  = await updatePokemon.execute({
        id,
        ...req.body});
      if(!pokemon) return res.status(404).json({
        message: "Pokemon Not found"
      });
      return res.status(201).json({
        message: "Successfully find Pokemon",
        data: pokemon
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  delete = async (req: Request, res: Response) =>{
    try {
      const { id } = req.params;
      const deletePokemon = new DeletePokemon(this.pokemonRepository);
      await deletePokemon.execute(parseInt(id));
      return res.status(201).json({
        message: "Successfully delete Pokemon",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  setAsFavorite = async (req: Request, res: Response) =>{
    try {
      const { id } = req.params;
      const setAsFavorite = new SetAsFavorite(this.pokemonRepository);
      await setAsFavorite.execute(parseInt(id));
      return res.status(201).json({
        message: "Successfully delete Pokemon",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

}
