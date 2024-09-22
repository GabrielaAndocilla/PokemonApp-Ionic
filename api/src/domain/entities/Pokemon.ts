export class Pokemon {
  id?: number;
  name?: string;
  height?: string;

  constructor(id: number, name:string, height:string) {
    this.id = id;
    this.name = name;
    this.height = height;
  }

}
