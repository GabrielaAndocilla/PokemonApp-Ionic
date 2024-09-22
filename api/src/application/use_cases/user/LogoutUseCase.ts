import  ITokenRepository from "../../../domain/repositories/ITokenRepository";

export class LogoutUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(token: string): Promise<void> {
    if (!token) {
      throw new Error("No token provided");
    }
    await this.tokenRepository.invalidateToken(token);
  }
}
