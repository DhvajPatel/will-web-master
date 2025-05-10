// src/services/login/LoginServiceImpl.ts
import { LoginService } from "./LoginService";
import { LoginRequestDto } from "./LoginRequestDto";
import { LoginResponseDto } from "./LoginResponseDto";

export class LoginServiceImpl implements LoginService {
    async login(request: LoginRequestDto): Promise<LoginResponseDto> {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        return await response.json();
    }
}
