// src/services/login/LoginService.ts
import { LoginRequestDto } from "./LoginRequestDto";
import { LoginResponseDto } from "./LoginResponseDto";

export interface LoginService {
    login(request: LoginRequestDto): Promise<LoginResponseDto>;
}
