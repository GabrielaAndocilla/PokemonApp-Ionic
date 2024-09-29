import User from "@domains/entities/User";

export default interface IUserRepository {
  register(user: User): Promise<boolean>;
  findByEmail(email:string): Promise<User | undefined>;
}
