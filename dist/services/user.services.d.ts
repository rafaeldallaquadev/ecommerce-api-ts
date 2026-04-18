import type { SafeUser, RegisterUserDTO, LoginUserDTO, AuthResponse } from '../types/user.types.js';
export declare function registerUser(data: RegisterUserDTO): Promise<SafeUser>;
export declare function userLogin(data: LoginUserDTO): Promise<AuthResponse>;
//# sourceMappingURL=user.services.d.ts.map