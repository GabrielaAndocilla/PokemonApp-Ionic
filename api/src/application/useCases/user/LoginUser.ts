import User from "@domains/entities/User";
import IUserRepository from "@domains/repositories/IUserRepository";
import bcrypt from "bcrypt";

export class LoginUser {
  private userRepository: IUserRepository;

  constructor(userRepository:IUserRepository){
    this.userRepository = userRepository
  }

  async execute(data: {email: string, password:string }): Promise<User | undefined> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) return undefined
    const passwordMatch = bcrypt.compare(data.password, user.password!);
    if (!passwordMatch) return undefined
    return user
  }
}
