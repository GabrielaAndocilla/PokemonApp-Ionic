
export interface Pokemon {
  id?:string,
  name: string,
  height: string,
  abilities: string[],
  movements: string[],
}

export interface PokemonPokeApi extends Pokemon {
  imageUrl: string,
}

export interface CustomPokemon extends Pokemon {
  isFavorite?: boolean,
}

export const convertToPokemonModel = (data:any) :PokemonPokeApi => {
const {abilities,moves,name, height, sprites} = data
return {
  name,
  height,
  imageUrl: sprites.front_default,
  abilities: abilities.reduce((abilitiesT:any,{ability}:any)=> {abilitiesT.push(ability.name)
    return abilitiesT
  },[]),
  movements:moves.reduce((movesT:any,{move}:any)=> {movesT.push(move.name)
    return movesT
  },[]),
}
}
