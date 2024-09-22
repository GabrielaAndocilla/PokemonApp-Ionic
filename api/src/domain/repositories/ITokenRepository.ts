export default interface ITokenRepository {
  invalidateToken(token: string): Promise<void>;
  isTokenInvalidated(token: string): Promise<{status:number,message:string}>;
}
