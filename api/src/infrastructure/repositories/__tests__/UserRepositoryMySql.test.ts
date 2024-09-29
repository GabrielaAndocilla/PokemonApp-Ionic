
import User from "@domains/entities/User";
import UserRepositoryMySql from "@repositories/UserRepositoryMySql";
import connection from "../../db";

jest.mock("../../db", () => ({
  query: jest.fn(),
}));

describe('UserRepository', ()=>{
  const userRepository = new UserRepositoryMySql()

  let querySpy: jest.SpyInstance;

  beforeEach(() => {
    querySpy = jest.spyOn(connection, 'query');
  });

  afterEach(() => {
    querySpy.mockRestore();
  });

  it('should register user', async ()=>{
    querySpy.mockImplementation( (query, values, callback) => {
       callback(null,{ affectedRows: 1 });
    });

    const user: User = {
      name:'user name',
      email:'user email',
      password:'password'
    }

    await userRepository.register(user)
    expect(connection.query).toHaveBeenNthCalledWith(1,
      "INSERT INTO users (name, email, password) VALUES(?,?,?)",
      ['user name', 'user email', 'password'],
      expect.any(Function)
    );
    expect(connection.query).toHaveBeenCalledTimes(1)

  })

  it('should login user', async ()=>{
    querySpy.mockImplementation( (query, values, callback) => {
       callback(null, [{name:'user name',email:'user@email.com'}] );
    });
    await userRepository.findByEmail("user@email.com")
    expect(connection.query).toHaveBeenNthCalledWith(1,
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      ['user@email.com'],
      expect.any(Function)
    );
    expect(connection.query).toHaveBeenCalledTimes(1)

  })
})
