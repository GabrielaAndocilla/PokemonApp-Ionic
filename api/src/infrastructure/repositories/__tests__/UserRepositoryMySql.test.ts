import UserRepositoryMySql from '@repositories/UserRepositoryMySql';

jest.mock('mysql2', () => {
  return {
    createConnection: jest.fn(() => ({
      execute: jest.fn(),
      // Include any other methods you need
    })),
  };
});


describe('Usee', () => {
  it('should throw an error when save is called', async () => {
    const repo = new UserRepositoryMySql();
    console.log("Repo instantiated"); // Log to confirm repo is created
    await repo.register({})
  });
});
