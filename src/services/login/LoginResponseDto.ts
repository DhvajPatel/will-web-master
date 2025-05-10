// src/services/login/LoginResponseDto.ts
import { UserDto } from "../user/UserDto";

export interface LoginResponseDto {
  token: string;
  user: UserDto;
}
