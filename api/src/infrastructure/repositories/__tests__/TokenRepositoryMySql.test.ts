
import TokenRepositoryMySql from "@repositories/TokenRepositoryMySql";
import connection from "../../db";

jest.mock("../../db", () => ({
  query: jest.fn(),
}));

describe('Token Repository', ()=>{
  const tokenRepository = new TokenRepositoryMySql()

  let querySpy: jest.SpyInstance;

  beforeEach(() => {
    querySpy = jest.spyOn(connection, 'query');
  });

  afterEach(() => {
    querySpy.mockRestore();
  });

  it('should invalidateToken', async ()=>{
    querySpy.mockImplementation( (query, values, callback) => {
       callback(null,{ affectedRows: 1 });
    });
    await tokenRepository.invalidateToken('1111')
    expect(connection.query).toHaveBeenNthCalledWith(1,
      "INSERT INTO invalidated_tokens (token) VALUES (?)",
      ['1111'],
      expect.any(Function)
    );
    expect(connection.query).toHaveBeenCalledTimes(1)
  })

  describe('isTokenInvalidated', () => {
    it('should validate when token is has not been invalidated', async ()=>{
      querySpy.mockImplementation( (query, values, callback) => {
         callback(null,[]);
      });
      const token:{status:number,message:string} =await tokenRepository.isTokenInvalidated('1111')
      expect(connection.query).toHaveBeenNthCalledWith(1,
        "SELECT * FROM invalidated_tokens WHERE token = ?",
        ['1111'],
        expect.any(Function)
      );
      expect(connection.query).toHaveBeenCalledTimes(1)
      expect(token.status).toBe(200)
      expect(token.message).toBe('Token is valid')
    })

    it('should identify when token is invalidated', async ()=>{
      querySpy.mockImplementation( (query, values, callback) => {
         callback(null,[{token:'1111'}]);
      });
      const token:{status:number,message:string} =await tokenRepository.isTokenInvalidated('1111')
      expect(connection.query).toHaveBeenNthCalledWith(1,
        "SELECT * FROM invalidated_tokens WHERE token = ?",
        ['1111'],
        expect.any(Function)
      );
      expect(token.status).toBe(401)
      expect(token.message).toBe('Token has invalidated')
    })

  })


})
