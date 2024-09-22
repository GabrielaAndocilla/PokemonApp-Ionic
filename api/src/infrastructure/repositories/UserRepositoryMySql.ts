import { ResultSetHeader, RowDataPacket } from "mysql2";
import User from "../../domain/entities/User";
import IUserRepository from "../../domain/repositories/IUserRepository";
import connection from "../db";

class UserRepositoryMySql implements IUserRepository {
  register(user: User): Promise<boolean> {
    return new Promise((resolve,reject)=> {
      connection.query<ResultSetHeader>("INSERT INTO users (name, email, password) VALUES(?,?,?)",[user.name, user.email, user.password],(err, res) => {
        if (err) reject(err);
        else resolve(true);
      })
    })
  }

  findByEmail(email: string): Promise<User | undefined> {
    return new Promise((resolve,reject)=> {
      console.log('email', email)
      connection.query<RowDataPacket[]>("SELECT * FROM users WHERE email = ? LIMIT 1",[email],(err, res) => {
        if (err) reject(err);
        else resolve(res[0] as User);
      })

    })
  }

}
export default UserRepositoryMySql;
