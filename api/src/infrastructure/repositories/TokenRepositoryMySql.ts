import { ResultSetHeader, RowDataPacket } from "mysql2";
import ITokenRepository from "../../domain/repositories/ITokenRepository";
import connection from "../db";


export default class TokenRepositoryMySql implements ITokenRepository {
  invalidateToken(token: string): Promise<void> {
    return new Promise((resolve,reject)=> {
      connection.query<ResultSetHeader>("INSERT INTO invalidated_tokens (token) VALUES (?)",[token],(err, res) => {
        if (err) reject(err);
        return resolve()
      })

    })
  }

  isTokenInvalidated(token: string): Promise<{status:number,message:string}> {
    return new Promise((resolve,reject)=> {
      connection.query<RowDataPacket[]>("SELECT * FROM invalidated_tokens WHERE token = ?",[token],(err, res) => {
        if (err) return resolve({status:500,message:'Error Getting Token'})
        if (res.length > 0) return resolve({status:401,message:'Token has invalidated'})
        return resolve({status:200,message:'Token is valid'})
      })

    })
  }
}
