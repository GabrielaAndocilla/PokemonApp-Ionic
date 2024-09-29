export class Pokemon {
  id?: number;
  name?: string;
  height?: string;
  abilities?:string[];
  movements?:string[];
  isFavorite?:boolean;

  constructor(id: number, name:string, height:string, abilities:string[], movements:string[], isFavorite?:boolean) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.abilities = abilities;
    this.movements = movements;
    this.isFavorite = isFavorite
  }

}
