import bcrypt from "bcrypt";
import User from "../../../domain/entities/User";
import IUserRepository from "../../../domain/repositories/IUserRepository";


export class RegisterUser {
  private userRepository: IUserRepository;

  constructor(userRepository:IUserRepository){
    this.userRepository = userRepository
  }

  async execute(data: { id: number; name: string; email: string, password:string }): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User(data.id,data.name,data.email,hashedPassword);
    return await this.userRepository.register(user);
  }
}
